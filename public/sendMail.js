// sendMail.js
const nodemailer = require(`nodemailer`);
const config = require(`./config`);

async function sendMail(recipient, subject, text, html) {
  try {
    console.log(`Sending email to recipient:`, recipient);
    console.log(`Email subject:`, subject);
    console.log(`Email text:`, text);
    console.log(`Email HTML:`, html);

    const transporter = nodemailer.createTransport({
      service: `gmail`,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });

    const mailOptions = {
      from: config.email.user,
      to: recipient, // Use recipients parameter here
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`Message sent: %s`, info.messageId);
    console.log(`Preview URL: %s`, nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error(`Error sending email:`, error.message);
    throw new Error(`Failed to send email`);
  }
}
module.exports = sendMail;



