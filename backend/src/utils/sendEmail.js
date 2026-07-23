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
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

const sendEmail = async (

  to,

  subject,

  html

) => {

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
