import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavePushSubscriptionDto } from './dto/save-push-subscription.dto';
import { SubscribeEmailDto } from './dto/subscribe-email.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { PushSubscriptionEntity } from './entities/push-subscription.entity';
import { Subscriber } from './entities/subscriber.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscribersRepository: Repository<Subscriber>,
    @InjectRepository(PushSubscriptionEntity)
    private readonly pushSubscriptionsRepository: Repository<PushSubscriptionEntity>,
  ) {}

  async subscribeEmail(dto: SubscribeEmailDto) {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.subscribersRepository.findOne({ where: { email } });

    if (existing) {
      existing.isActive = true;
      existing.source = dto.source?.trim() || existing.source;
      const saved = await this.subscribersRepository.save(existing);
      return { id: saved.id, email: saved.email, isActive: saved.isActive };
    }

    const created = this.subscribersRepository.create({
      email,
      source: dto.source?.trim() || 'web',
      isActive: true,
    });

    const saved = await this.subscribersRepository.save(created);
    return { id: saved.id, email: saved.email, isActive: saved.isActive };
  }

  async savePushSubscription(dto: SavePushSubscriptionDto) {
    const endpoint = dto.subscription.endpoint.trim();
    const existing = await this.pushSubscriptionsRepository.findOne({ where: { endpoint } });

    if (existing) {
      existing.p256dh = dto.subscription.keys.p256dh;
      existing.auth = dto.subscription.keys.auth;
      existing.email = dto.email?.trim().toLowerCase() || existing.email;
      existing.isActive = dto.enabled ?? true;
      return this.pushSubscriptionsRepository.save(existing);
    }

    const created = this.pushSubscriptionsRepository.create({
      endpoint,
      p256dh: dto.subscription.keys.p256dh,
      auth: dto.subscription.keys.auth,
      email: dto.email?.trim().toLowerCase() || null,
      isActive: dto.enabled ?? true,
    });

    return this.pushSubscriptionsRepository.save(created);
  }

  async disablePushSubscription(endpoint: string) {
    const existing = await this.pushSubscriptionsRepository.findOne({ where: { endpoint } });
    if (!existing) {
      return { success: true };
    }

    existing.isActive = false;
    await this.pushSubscriptionsRepository.save(existing);
    return { success: true };
  }

  async listSubscribers(page = 1, limit = 20, q = '') {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const search = q.trim().toLowerCase();

    const query = this.subscribersRepository
      .createQueryBuilder('subscriber')
      .orderBy('subscriber.createdAt', 'DESC')
      .skip((safePage - 1) * safeLimit)
      .take(safeLimit);

    if (search) {
      query.where('LOWER(subscriber.email) LIKE :search', { search: `%${search}%` });
    }

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    };
  }

  async updateSubscriber(id: number, dto: UpdateSubscriberDto) {
    const subscriber = await this.subscribersRepository.findOne({ where: { id } });
    if (!subscriber) {
      return null;
    }

    if (dto.isActive !== undefined) {
      subscriber.isActive = dto.isActive;
    }

    return this.subscribersRepository.save(subscriber);
  }

  getPublicPushKey() {
    return process.env.WEB_PUSH_PUBLIC_KEY || '';
  }
}