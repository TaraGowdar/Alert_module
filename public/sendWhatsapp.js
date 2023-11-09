const twilio = require(`twilio`);
const config = require(`./config`);

const client = twilio(config.accountSid, config.authToken);

async function sendWhatsapp(recipient, messageBody) {
  try {
        await client.messages.create({
        body: messageBody,
        from: config.twilioPhoneNumber,
        to: recipient,
        messagingServiceSid: config.messagingServiceSid, // You may need to adjust this
      });
      console.log(`WhatsApp message sent to ${recipient}`);
    }
   catch (error) {
    console.error(`Error sending WhatsApp messages:`, error);
    throw new Error(`Failed to send WhatsApp messages`);
  }
}

module.exports = sendWhatsapp;

// // Example usage
// // const recipients = ['+1234567890', '+9876543210']; 
// // const messageBody = 'This is a test message from Twilio WhatsApp!';

