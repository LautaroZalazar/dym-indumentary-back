export interface INotificationService {
  newsletterSuscriptionNotification(email: string, name: string): Promise<any>;
  newsletterWithdrawalNotification(
    name: string,
    paymentOrderNumber: string,
  ): Promise<any>;
  recoveryPasswordNotification(
    name: string,
    email: string,
    token: string,
  ): Promise<any>;
}
