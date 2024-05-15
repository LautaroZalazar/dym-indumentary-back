export interface INotificationService {
  newsletterSuscriptionNotification(email: string, name: string): Promise<any>;
  newsletterWithdrawalNotification(
    name: string,
    paymentOrderNumber: string,
  ): Promise<any>;
}
