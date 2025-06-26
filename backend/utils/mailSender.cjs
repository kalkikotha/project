// utils/mailSender.js
const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // or 465
      auth: {
        user: 'kalki6309@gmail.com',
        pass: 'bwpj qizn harz seup',
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'kalki6309@gmail.com',
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;