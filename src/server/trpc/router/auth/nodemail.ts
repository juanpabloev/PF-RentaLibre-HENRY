import nodemailer from "nodemailer";



const gmail=process.env.GMAIL_ACCOUNT
const gmailPass=process.env.GMAIL_ACCCOUNT_PASS


export const mailer=async(email:string,hash:string,path:string,textLink:string)=>{

    
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: gmail, // generated ethereal user
            pass: gmailPass, // generated ethereal password
        },
    });
    
    
    
    const info = await transporter.sendMail({
        from: 'dari.app.test@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Account verification ✔", // Subject line
        text: "Hello ?", // plain text body
        html: `<div>
        <b>Hello  </b>, 
        <p>this is your verification hash </p>
        <a target='blanck' href='https://dari2.vercel.app/${path}${hash}'>${textLink}</a>
        <p>Dari developper : hossem edine ali</p>
        </div>`
        
    }); 


    return(info)
}