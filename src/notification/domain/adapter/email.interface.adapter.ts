export interface IEmailAdapter {
  newsletterSuscriptionEmail(email: string, name: string): Promise<any>;
}
