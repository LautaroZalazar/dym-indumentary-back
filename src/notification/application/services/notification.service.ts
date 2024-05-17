import { IEmailAdapter } from 'src/notification/domain/adapter/email.interface.adapter';
import { INotificationService } from 'src/notification/domain/services/notification.interface.service';
import SymbolsNotification from 'src/notification/symbols-notification';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject(SymbolsNotification.IEmailAdapter)
    private readonly emailAdapter: IEmailAdapter,
  ) { }

  async newsletterSuscriptionNotification(
    email: string,
    name: string,
  ): Promise<any> {
    try {
      return await this.emailAdapter.newsletterSuscriptionEmail(email, name);
    } catch (error) {
      throw new Error(error);
    }
  }

  async newsletterWithdrawalNotification(
    name: string,
    paymentOrderNumber: string,
  ): Promise<any> {
    try {
      return await this.emailAdapter.newsletterWithdrawal(
        name,
        paymentOrderNumber,
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
