export function newsletterSuscriptionTemplate(name: string) {
  const newsletterSuscription = `
 <body style="font-family: Arial, sans-serif; max-width: 600px; background-color: #616A6B; justify-center;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding: 20px; text-align: center;">
            <div style="max-width: 600px; padding: 20px; border-radius: 10px; margin: auto; background-color: #545050">
              <h1 style="color: white;">¡Bienvenido ${name} a nuestro sistema de notificaciones!</h1>
              <p style="color: white;">Estamos emocionados de tenerte en nuestra comunidad. A partir de ahora, estarás al tanto de todas nuestras novedades y promociones.</p>
              <p style="color: white;">¡Esperamos que disfrutes de tu experiencia con nosotros!</p>
              <p style="color: white;">Atentamente, el equipo de DYM Indumentaria.</p>
            </div>
          </td>
        </tr>
      </table>
    </body>
`;

  return newsletterSuscription;
}
