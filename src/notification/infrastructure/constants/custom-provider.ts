import { NotificationService } from '@/notification/application/services/notification.service';
import SymbolsNotification from '@/notification/symbols-notification';
import { ResendProvider } from '../provider/resend/resend.provider';

export const notificationService = {
  provide: SymbolsNotification.INotificationService,
  useClass: NotificationService,
};

export const emailAdapter = {
  provide: SymbolsNotification.IEmailAdapter,
  useClass: ResendProvider,
};
