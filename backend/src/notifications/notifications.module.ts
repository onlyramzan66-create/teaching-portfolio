import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './notifications.service';
import { PushSubscriptionEntity } from '../subscribers/entities/push-subscription.entity';
import { Subscriber } from '../subscribers/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PushSubscriptionEntity, Subscriber])],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
