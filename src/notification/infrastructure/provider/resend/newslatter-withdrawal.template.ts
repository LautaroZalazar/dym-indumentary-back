import { withdrawalCode } from '../../utils/withdrawal-code.utils';

export function newsletterWithdrawalTemplate(
  name: string,
  paymentOrderNumber: string,
) {
  const mixCode = withdrawalCode();

  const newsletterWithdrawal = `
    <body style="font-family: Arial, sans-serif; max-width: 600px; background-color: #616A6B; justify-center;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding: 20px; text-align: center;">
            <div style="max-width: 600px; padding: 20px; border-radius: 10px; margin: auto; background-color: #545050">
              <h1 style="color: white;> Hola ${name}!</h1>
              <p style="color: white;">Tu pedido número ${paymentOrderNumber} ha sido confirmado para su retiro.</p>
              <p style="color: white;">Tu código de retiro único es: ${mixCode}</p>
              <p style="color: white;">Por favor, asegúrate de presentar el número de pedido al momento de retirar tus prendas.</p>
              <p style="color: white;">¡Gracias por confiar en DYM Indumentaria!</p>
              <p style="color: white;">Atentamente, el equipo de DYM Indumentaria.</p>
            </div>
          </td>
        </tr>
      </table>
    </body>
  `;

  return newsletterWithdrawal;
}
