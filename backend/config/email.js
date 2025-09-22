import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';

configDotenv()

export const mailer = nodemailer.createTransport({
  service : "gmail.com",
  auth: {
    user: process.env.SMTP_USER || 'nelsonprox92@gmail.com',
    pass: process.env.SMTP_PASS || 'your_password'
  }
})

export const sendMail = async ({ to, subject, html }) => {
  try {
    const from = process.env.MAIL_FROM || 'CarHubConnect <no-reply@carhubconnect.local>'
    return mailer.sendMail({ from, to, subject, html })
  } catch (error) {
    throw new Error(error)
  }
}

