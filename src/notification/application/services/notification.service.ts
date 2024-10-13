import { BaseErrorException } from 'src/core/domain/exceptions/base/base.error.exception';
import { IEmailAdapter } from '../../../notification/domain/adapter/email.interface.adapter';
import { INotificationService } from '../../../notification/domain/services/notification.interface.service';
import SymbolsNotification from '../../../notification/symbols-notification';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject(SymbolsNotification.IEmailAdapter)
    private readonly emailAdapter: IEmailAdapter,
  ) {}

  async newsletterSuscriptionNotification(
    email: string,
    name: string,
  ): Promise<any> {
    try {
      return await this.emailAdapter.newsletterSuscriptionEmail(email, name);
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
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
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async recoveryPasswordNotification(
    name: string,
    email: string,
    token: string,
  ): Promise<any> {
    try {
      return await this.emailAdapter.recoveryPasswordEmail(name, email, token);
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
