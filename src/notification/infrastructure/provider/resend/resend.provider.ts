import config from '../../../../config';
import { IEmailAdapter } from '../../../../notification/domain/adapter/email.interface.adapter';
import { Resend } from 'resend';
import { newsletterSuscriptionTemplate } from './newslatter-suscription.template';
import { newsletterWithdrawalTemplate } from './newslatter-withdrawal.template';
import { recoveryPasswordTemplate } from './recoveryPassword.template';

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

  async newsletterWithdrawal(name: string, orderNumber: string): Promise<any> {
    try {
      const resend = new Resend(config().providerEmail.resend.apyKey);

      const { data, error } = await resend.emails.send({
        from: 'DYM Indumentaria <onboarding@resend.dev>',
        to: ['dym.indumentaria.soporte@gmail.com'],
        subject: 'DYM Indumentaria',
        html: newsletterWithdrawalTemplate(name, orderNumber),
      });

      if (error) throw new Error('error');

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async recoveryPasswordEmail(
    name: string,
    email: string,
    token: string,
  ): Promise<any> {
    try {
      const resend = new Resend(config().providerEmail.resend.apyKey);

      const { data, error } = await resend.emails.send({
        from: 'DYM Indumentaria <onboarding@resend.dev>',
        to: ['dym.indumentaria.soporte@gmail.com'],
        subject: 'Recuperación de contraseña',
        html: recoveryPasswordTemplate(name, token),
      });

      if (error) throw new Error('error');

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
