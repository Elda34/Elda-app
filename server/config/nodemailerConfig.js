// config/nodemailerConfig.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure this line is included if you use dotenv

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  },
  tls: {
      rejectUnauthorized: false
  }
});
module.exports = transporter;
