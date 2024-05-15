export interface IEmailAdapter {
  newsletterSuscriptionEmail(email: string, name: string): Promise<any>;
  newsletterWithdrawal(name: string, paymentOrderNumber: string): Promise<any>;
}
