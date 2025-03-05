import nodemailer from 'nodemailer';

// Configure transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // Keep false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    // Force TLSv1.2 for Outlook
    minVersion: 'TLSv1.2',
    ciphers: 'HIGH:MEDIUM:!aNULL:!MD5:!RC4',
    rejectUnauthorized: true
  }
});

// Email template with dynamic content
const getEmailTemplate = (customerName: string, plan: string, amount: number, paymentMethod: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="background-color: #7D5683; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">¡Gracias por tu compra!</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd;">
            <p>Hola <strong>${customerName}</strong>,</p>
            <p>Gracias por adquirir nuestro <strong>${plan}</strong>. Tu pago ha sido procesado correctamente.</p>
            <div style="background-color: #fff; border: 1px solid #eee; padding: 15px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #7D5683;">Detalles de la compra:</h3>
                <p><strong>Plan:</strong> ${plan}</p>
                <p><strong>Monto:</strong> $${amount.toFixed(2)} MXN</p>
                <p><strong>Método de pago:</strong> ${paymentMethod}</p>
            </div>
            <p>En breve nos pondremos en contacto contigo para comenzar a trabajar en tu proyecto. Mientras tanto, si tienes alguna pregunta, no dudes en contactarnos.</p>
            <p>Saludos,<br/>El equipo de Nightly Software</p>
            <div align="center">
                <img src="https://nightlysoftware.com/NS-Isotipo_color.png" alt="NightlySoftware Isotipo" width="48px" />
                <div style="display: flex; align-items: center; justify-content: center;">
                    <div style="height: 1px; width: 40px; background-color: rgba(125, 86, 131, 0.5);"></div>
                    <p style="color: #7D5683; font-size: 14px;">De noche, creamos el mañana</p>
                    <div style="height: 1px; width: 40px; background-color: rgba(125, 86, 131, 0.5);"></div>
                </div>
            </div>
        </div>
        <div style="text-align: center; padding-top: 20px; font-size: 12px; color: #666;">
            <p>&copy; 2025 Nightly Software. Todos los derechos reservados.</p>
        </div>
    </div>
  `;
};

export async function sendConfirmationEmail(
  email: string,
  customerName: string,
  plan: string,
  amount: number,
  paymentMethod: string
) {
  try {
    console.log(`Sending confirmation email to ${email}`);
    const result = await transporter.sendMail({
      from: `"Nightly Software" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Confirmación de Compra - Nightly Software",
      html: getEmailTemplate(customerName, plan, amount, paymentMethod),
    });
    console.log('Email sent:', result.messageId);
    console.log(`resultado :`, result);

    console.log(`Confirmation email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error };
  }
}
