export interface INotificationService {
  newsletterSuscriptionNotification(email: string, name: string): Promise<any>;
}
