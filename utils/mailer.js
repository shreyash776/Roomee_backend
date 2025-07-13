import nodemailer from 'nodemailer'; 
import dotenv from 'dotenv';
dotenv.config();
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587,
  secure: false,
  auth: { 
    user: process.env.SMTP_USER,  
    pass: process.env.SMTP_PASS,
    
  },
});

// console.log('SMTP_USER:', process.env.SMTP_USER);
// console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'Loaded' : 'Missing');
console.log('ALL ENV:', process.env);
export const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from:  `"roomee" <${process.env.SMTP_USER}>`,
    to, 
    subject,
    text,
    html, 
  };

  return transporter.sendMail(mailOptions);
};
