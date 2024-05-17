import { INotificationService } from '../../../../notification/domain/services/notification.interface.service';
import SymbolsNotification from '../../../../notification/symbols-notification';
import { Controller, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('notification-event')
export class NotificationEventController {
  constructor(
    @Inject(SymbolsNotification.INotificationService)
    private readonly notificationService: INotificationService,
  ) { }

  @OnEvent('newslatter-suscription-notification.created')
  async welcomeNotification({ email, name }: { email: string; name: string }) {
    await this.notificationService.newsletterSuscriptionNotification(
      email,
      name,
    );
  }

  @OnEvent('newslatter-withdrawal-notification')
  async newsletterWithdrawalTemplate({
    name,
    paymentOrderNumber,
  }: {
    name: string;
    paymentOrderNumber: string;
  }) {
    await this.notificationService.newsletterWithdrawalNotification(
      name,
      paymentOrderNumber,
    );
  }
}
