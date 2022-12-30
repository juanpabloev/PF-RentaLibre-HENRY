import nodemailer from "nodemailer";

const gmail = process.env.GMAIL_ACCOUNT;
const gmailPass = process.env.GMAIL_ACCCOUNT_PASS;

export const sendMail = async (
  mail: string,
  subject: string,
  message: string,
  name: string,
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

  const mailOptions = await transporter.sendMail({
    from: gmail, // sender address
    to: mail, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: `<div>
        <b>Mail de test Rentalibre</b>, 
        <p>Hola, ${name}</p>
        </div>`,
  });

  return sendMail;
};
