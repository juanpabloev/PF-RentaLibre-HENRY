import { type NextApiRequest, type NextApiResponse } from "next";
import nodemailer from "nodemailer";

const gmail = process.env.GMAIL_ACCOUNT;
const gmailPass = process.env.GMAIL_ACCCOUNT_PASS;

//////////////////////////////////////////
// ESTA FUNCION SE AUTOEJECUTA AL LLAMAR A LA RUTA: api/contactMail
/* 

ej:

const onSubmit = async () => {
  setState((prev) => ({
    ...prev,
    isLoading: true,
  }));
  try {
    console.log(values)
    const res = await fetch(`api/contactMail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }) */

///////////////////////////////////////////////////////

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message, subject } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmail,
      pass: gmailPass
    }
  });

  try {
    await transporter.sendMail({
      from: gmail,
      to: email,
      subject: subject,
      html: `<p>You have a contact form submission</p><br>
        <p><strong>Email: </strong> ${email}</p><br>
        <p><strong>Message: </strong> ${message}</p><br>
      `
    });
  } catch (error) {
    return res.status(500).json( error?.toString() );
  }
  return res.status(200).json({ error: "" });
};