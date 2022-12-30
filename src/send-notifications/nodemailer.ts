import { Html } from "next/document";
import nodemailer from "nodemailer";

const gmail = process.env.GMAIL_ACCOUNT;
const gmailPass = process.env.GMAIL_ACCCOUNT_PASS;

export const sendMailTransporter = async (
  mail: string,
  subject: string,
  message: string,
  text: any,
  name: any, // puede recibir un nombre del estado session
  html: any,
) => {
  
  // create reusable transporter object using the default SMTP transport template
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: gmail, // generated ethereal user
      pass: gmailPass, // generated ethereal password
    },
  });

  await transporter.sendMail({
      
    from: gmail, // sender address
    to: mail, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: html,
  });

  return sendMailTransporter;
};

// create reusable transporter object using the default SMTP transport template

/* export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmail, // generated ethereal user
    pass: gmailPass, // generated ethereal password
  },
});
  

interface MailOptions {
  from: string; // sender address
  to: string; // list of receivers
  subject: string; // Subject line
  message: string; // plain text body
}

export const mailOptions: MailOptions = {
  from: gmail, // sender address
  to,// list of receivers
  subject, // Subject line
  message // plain text body
}; */

