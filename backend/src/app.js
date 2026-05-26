import express from 'express'

import cors from 'cors'

import cookieParser from 'cookie-parser'

import authRoutes from "./routes/authRoutes.js";

import invitationRoutes from "./routes/invitationRoutes.js";

const app = express()



/*
MIDDLEWARE
*/

app.use(

  cors({

    origin: true,

    credentials: true

  })

)

app.use(express.json())

app.use(cookieParser())

app.use(
  '/api/auth',
  authRoutes
)

app.use(
    '/api/invitations',
    invitationRoutes
  )

/*
TEST ROUTE
*/

app.get('/', (req, res) => {

  res.json({

    success: true,

    message:
      'Wedding Invitation API Running'

  })

})



export default app