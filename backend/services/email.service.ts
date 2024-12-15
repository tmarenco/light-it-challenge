import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();



export const sendEmail = async (to: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    }
  });

  await transporter.sendMail({
    from: 'hello@demomailtrap.com',
    to: 'tmarencocastello@gmail.com',
    subject: 'Registration Successful!',
    text: 'Your registration has been successfully completed. Welcome to our clinic!',
  });
};
