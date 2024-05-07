import config from '@/config';
import { IEmailAdapter } from '@/notification/domain/adapter/email.interface.adapter';
import { Resend } from 'resend';
import { newsletterSuscriptionTemplate } from './newslatter-suscription.template';

export class ResendProvider implements IEmailAdapter {
  constructor() {}

  async newsletterSuscriptionEmail(email: string, name: string): Promise<any> {
    try {
      const resend = new Resend(config().providerEmail.resend.apyKey);

      const { data, error } = await resend.emails.send({
        from: 'DYM Indumentaria <onboarding@resend.dev>',
        to: ['dym.indumentaria.soporte@gmail.com'],
        subject: 'DYM Indumentaria',
        html: newsletterSuscriptionTemplate(name),
      });

      if (error) throw new Error('error');

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
