const nodemailer = require('nodemailer');

const sendRealtimeEmail = async (userEmail, subject, textContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"OmniAgent AI" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: subject,
      text: textContent,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f5;">
              <h2 style="color: #4f46e5;">OmniAgent Action Summary</h2>
              <p style="font-size: 14px; color: #334155;">${textContent.replace(/\n/g, '<br>')}</p>
             </div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Realtime email dispatched: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Email dispatch error:', error);
    return false;
  }
};

module.exports = { sendRealtimeEmail };