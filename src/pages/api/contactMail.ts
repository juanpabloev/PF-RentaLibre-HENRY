import { type NextApiRequest, type NextApiResponse } from "next";
import nodemailer from "nodemailer";

const gmail = process.env.GMAIL_ACCOUNT;
const gmailPass = process.env.GMAIL_ACCCOUNT_PASS;

const nodemail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message, subject } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmail,
      pass: gmailPass,
    },
  });

  try {
    await transporter.sendMail({
      from: gmail,
      to: email,
      subject: subject,
      html: `
        <p><strong>Hola, </strong> ${name}</p><br>
        <p>${message}</p>
      `,
    });
  } catch (error) {
    return res.status(500).json(error?.toString());
  }
  return res.status(200).json({ error: "" });
};

export default nodemail;
