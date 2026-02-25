import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PushSubscriptionEntity } from '../subscribers/entities/push-subscription.entity';
import { Subscriber } from '../subscribers/entities/subscriber.entity';

type WebPushModule = {
  setVapidDetails: (subject: string, publicKey: string, privateKey: string) => void;
  sendNotification: (
    subscription: { endpoint: string; keys: { p256dh: string; auth: string } },
    payload: string,
  ) => Promise<unknown>;
};

type MailTransporter = {
  sendMail: (options: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }) => Promise<unknown>;
};

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private webPush: WebPushModule | null = null;
  private pushEnabled = false;
  private mailEnabled = false;
  private mailTransporter: MailTransporter | null = null;
  private mailFrom = 'no-reply@gohar.online';

  constructor(
    @InjectRepository(PushSubscriptionEntity)
    private readonly pushSubscriptionsRepository: Repository<PushSubscriptionEntity>,
    @InjectRepository(Subscriber)
    private readonly subscribersRepository: Repository<Subscriber>,
  ) {
    this.initializeWebPush();
    this.initializeEmailTransport();
  }

  private initializeWebPush() {
    const publicKey = process.env.WEB_PUSH_PUBLIC_KEY;
    const privateKey = process.env.WEB_PUSH_PRIVATE_KEY;
    const subject = process.env.WEB_PUSH_SUBJECT || 'mailto:admin@example.com';

    if (!publicKey || !privateKey) {
      this.logger.warn('Web push keys are missing; push notifications are disabled.');
      return;
    }

    try {
      const webPushModule = (eval('require')('web-push') as WebPushModule);
      webPushModule.setVapidDetails(subject, publicKey, privateKey);
      this.webPush = webPushModule;
      this.pushEnabled = true;
    } catch {
      this.logger.warn('web-push package is not installed; push notifications are disabled.');
    }
  }

  private initializeEmailTransport() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM;

    if (!host || !user || !pass) {
      this.logger.warn('SMTP config is missing; email notifications are disabled.');
      return;
    }

    try {
      const nodemailer = eval('require')('nodemailer') as {
        createTransport: (options: {
          host: string;
          port: number;
          secure: boolean;
          auth: { user: string; pass: string };
        }) => MailTransporter;
      };
      this.mailTransporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      this.mailFrom = from || user;
      this.mailEnabled = true;
    } catch {
      this.logger.warn('nodemailer package is not installed; email notifications are disabled.');
    }
  }

  async notifyPublishedPost(payload: {
    title: string;
    body: string;
    url: string;
    tag?: string;
  }) {
    await Promise.all([
      this.notifyPushSubscribers(payload),
      this.notifyEmailSubscribers(payload),
    ]);
  }

  private async notifyPushSubscribers(payload: {
    title: string;
    body: string;
    url: string;
    tag?: string;
  }) {
    if (!this.pushEnabled || !this.webPush) return;

    const subscriptions = await this.pushSubscriptionsRepository.find({
      where: { isActive: true },
      order: { updatedAt: 'DESC' },
      take: 2000,
    });

    if (!subscriptions.length) {
      return;
    }

    const message = JSON.stringify({
      title: payload.title,
      body: payload.body,
      url: payload.url,
      tag: payload.tag || 'new-post',
    });

    for (const sub of subscriptions) {
      try {
        await this.webPush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          },
          message,
        );
      } catch (error: unknown) {
        const statusCode =
          typeof error === 'object' && error !== null && 'statusCode' in error
            ? Number((error as { statusCode?: number }).statusCode)
            : 0;

        if (statusCode === 404 || statusCode === 410) {
          sub.isActive = false;
          await this.pushSubscriptionsRepository.save(sub);
        }
      }
    }
  }

  private async notifyEmailSubscribers(payload: {
    title: string;
    body: string;
    url: string;
  }) {
    if (!this.mailEnabled || !this.mailTransporter) return;
    const transporter = this.mailTransporter;

    const subscribers = await this.subscribersRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
      take: 5000,
    });

    if (!subscribers.length) return;

    const subject = payload.title;
    const preview =
      payload.body.length > 220 ? `${payload.body.slice(0, 217).trim()}...` : payload.body;
    const text = `GoharOnline Update\n\n${payload.title}\n\n${preview}\n\nRead more: ${payload.url}\n\nYou received this email because you subscribed to GoharOnline updates.`;
    const html = `
      <div style="background:#f3f4f6;padding:24px 0;margin:0">
        <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;font-family:Arial,sans-serif;color:#111827">
          <div style="padding:18px 22px;background:#0f172a;color:#e2e8f0">
            <p style="margin:0;font-size:12px;letter-spacing:.04em;text-transform:uppercase">GoharOnline Academy</p>
            <h2 style="margin:8px 0 0;font-size:20px;line-height:1.35;color:#ffffff">${payload.title}</h2>
          </div>
          <div style="padding:22px">
            <p style="margin:0 0 10px;font-size:14px;color:#374151">
              A new blog update is live for students and parents.
            </p>
            <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#111827">
              ${preview}
            </p>
            <a href="${payload.url}" style="display:inline-block;padding:11px 16px;background:#10b981;color:#052e16;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px">
              Read More
            </a>
            <p style="margin:16px 0 0;font-size:12px;color:#6b7280">
              If the button does not work, open this link:<br />
              <a href="${payload.url}" style="color:#0f766e;text-decoration:none">${payload.url}</a>
            </p>
          </div>
          <div style="padding:12px 22px;border-top:1px solid #e5e7eb;font-size:11px;color:#6b7280">
            You are receiving this because you subscribed to GoharOnline updates.
          </div>
        </div>
      </div>
    `;

    const batchSize = 50;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (subscriber) => {
          try {
            await transporter.sendMail({
              from: this.mailFrom,
              to: subscriber.email,
              subject,
              text,
              html,
            });
          } catch {
            // keep loop running even if one address fails
          }
        }),
      );
    }
  }
}
