import { Module } from '@nestjs/common';
import { NotificationEventController } from './infrastructure/nest/controllers/notification.events.controller';
import {
  emailAdapter,
  notificationService,
} from './infrastructure/constants/custom-provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [NotificationEventController],
  providers: [notificationService, emailAdapter],
  exports: [],
})
export class NotificationModule {}
