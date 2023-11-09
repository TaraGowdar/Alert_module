// // script.js
// const sendAlert = require('./public/sendAlert');

// document.getElementById('alertForm').addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const alertType = document.querySelector('input[name="alertType"]:checked').value;

//   let recipient, messageBody, title, html;

//   if (alertType === 'sms') {
//     recipient = document.getElementById('smsRecipient').value;
//     messageBody = document.getElementById('smsMessageBody').value;
//   } else if (alertType === 'whatsapp') {
//     recipient = document.getElementById('whatsappRecipient').value;
//     messageBody = document.getElementById('whatsappMessageBody').value;
//   } else if (alertType === 'mail') {
//     recipient = document.getElementById('mailRecipient').value;
//     messageBody = document.getElementById('mailMessageBody').value;
//     title = document.getElementById('title').value;
//     html = document.getElementById('html').value;
//   }

//   try {
//     const result = await sendAlert(alertType, recipient, messageBody, title, html);
//     console.log(result); // Display success message
//   } catch (error) {
//     console.error('Error sending alert:', error);
//   }
// });
document.getElementById('alertForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const alertType = document.querySelector('input[name="alertType"]:checked').value;
  const recipient = document.getElementById(`${alertType}Recipient`).value.trim();
  const messageBody = document.getElementById(`${alertType}MessageBody`).value;
  const title = document.getElementById('title').value;
  const html = document.getElementById('html').value;

  try {
    const response = await fetch('/send-alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alertType, recipient, messageBody, title, html }),
    });

    const result = await response.json();

    if (result.success) {
      console.log(result.message); // Display success message
    } else {
      console.error('Error sending alert:', result.message);
    }
  } catch (error) {
    console.error('Error sending alert:', error);
  }
});
