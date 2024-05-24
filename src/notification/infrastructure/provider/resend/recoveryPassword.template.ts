import config from '../../../../config';

export function recoveryPasswordTemplate(name: string, token: string) {
  const recoveryPassword = `
  <body style="font-family: Arial, sans-serif; max-width: 600px; background-color: #616A6B; justify-center;">
      <table role="presentation" width="100%" height="auto" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding: 20px; text-align: center;">
            <div style="max-width: 600px; padding: 20px; border-radius: 10px; margin: auto; background-color: #545050;">
              <p style="color: white;">Has solicitado recuperar tu contraseña.</p>
              <p style="color: white;">Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
              <a href="${config().app.front.front_base_url}reset-password?t=${token}" style="color: white;">Restablecer contraseña</a>
              <p style="color: white;">Atentamente, el equipo de DYM Indumentaria.</p>
              <p style="color: white;">Si no has solicitado un cambio de contraseña, puedes ignorar este correo electrónico.</p>
            </div>
          </td>
        </tr>
      </table>
    </body>
  `;

  return recoveryPassword;
}
