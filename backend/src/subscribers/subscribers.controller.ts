import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { SavePushSubscriptionDto } from './dto/save-push-subscription.dto';
import { SubscribeEmailDto } from './dto/subscribe-email.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscribersService } from './subscribers.service';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post('email')
  subscribeEmail(@Body() dto: SubscribeEmailDto) {
    return this.subscribersService.subscribeEmail(dto);
  }

  @Post('push')
  savePush(@Body() dto: SavePushSubscriptionDto) {
    return this.subscribersService.savePushSubscription(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('push/unsubscribe')
  unsubscribePush(@Body('endpoint') endpoint: string) {
    return this.subscribersService.disablePushSubscription(endpoint);
  }

  @Get('push-public-key')
  pushPublicKey() {
    return { publicKey: this.subscribersService.getPublicPushKey() };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/email')
  listSubscribers(@Query('page') page?: string, @Query('limit') limit?: string, @Query('q') q?: string) {
    const parsedPage = Number(page ?? 1);
    const parsedLimit = Number(limit ?? 20);
    return this.subscribersService.listSubscribers(
      Number.isFinite(parsedPage) ? parsedPage : 1,
      Number.isFinite(parsedLimit) ? parsedLimit : 20,
      q ?? '',
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/email/:id')
  updateSubscriber(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSubscriberDto,
  ) {
    return this.subscribersService.updateSubscriber(id, dto);
  }
}