import nodemailer from 'nodemailer'

import dotenv
from 'dotenv'

dotenv.config()

const transporter1 =
  nodemailer.createTransport({

    service: 'gmail',

    auth: {

      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS

    }

  })

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

const sendEmail = async (

  to,

  subject,

  html

) => {

  console.log("EMAIL:", process.env.EMAIL_USER);
  console.log("PASS EXISTS:", !!process.env.EMAIL_PASS);
  console.log("Starting SMTP verify...");

  await transporter.verify();
  
  console.log("SMTP connected successfully");

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to,

    subject,

    html

  })

}

export default sendEmail
