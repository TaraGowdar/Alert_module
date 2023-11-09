// // server.js
// const express = require(`express`);
// const bodyParser = require(`body-parser`);
// const path=require(`path`);
// const sendAlert = require('./public/sendAlert');

// const app = express();
// exports.app = app;
// const PORT = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files from the `public` directory
// app.use(express.static(path.join(__dirname, `public`)));

// app.get("/", (req,res)=>{
//   res.sendFile(__dirname, 'public', "/index.html")
// });


// // Process the data and send the appropriate alert
//   app.post('/send-alert', async (req, res) => {
//     const { alertType, recipient, messageBody, title, html } = req.body;
//     try {
//       const result = await sendAlert(alertType, recipient, messageBody, title, html);
//       res.json({ success: true, message: result });
//     } catch (error) {
//       console.error('Error sending alert:', error);
//       res.status(500).json({ success: false, message: 'Failed to send alert.' });
//     }
//   });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sendMail = require('./public/sendMail');
const sendSMS = require('./public/sendSMS');
const sendWhatsapp = require('./public/sendWhatsapp');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-alert', async (req, res) => {
  const { alertType, recipient, messageBody, title, html } = req.body;

  try {
    switch (alertType) {
      case 'sms':
        await sendSMS(recipient, messageBody);
        res.json({ success: true, message: 'SMS alert sent successfully.' });
        break;
      case 'whatsapp':
        await sendWhatsapp(recipient, messageBody);
        res.json({ success: true, message: 'WhatsApp alert sent successfully.' });
        break;
      case 'mail':
        await sendMail(recipient, title, messageBody, html);
        res.json({ success: true, message: 'Email alert sent successfully.' });
        break;
      default:
        res.status(400).json({ success: false, message: 'Invalid alert type' });
    }
  } catch (error) {
    console.error('Error sending alert:', error);
    res.status(500).json({ success: false, message: 'Failed to send alert.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
