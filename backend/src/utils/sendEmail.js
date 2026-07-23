import nodemailer from 'nodemailer'

import dotenv
from 'dotenv'

dotenv.config()

const transporter =
  nodemailer.createTransport({

    service: 'gmail',

    auth: {

      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS

    }

  })

const sendEmail1 = async (

  to,

  subject,

  html

) => {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to,

    subject,

    html

  })

}

const sendEmail = async () => {
    console.log("Email skipped");
}

export default sendEmail
