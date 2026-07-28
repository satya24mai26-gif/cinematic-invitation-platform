import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoutes.js";
import invitationRoutes from "./routes/invitationRoutes.js";

const app = express()

app.set('trust proxy', 1)

/*
MIDDLEWARE
*/
app.use(
  cors({
    origin: [
      'http://localhost:5173', 
      'https://cinematic-invitation-platform.vercel.app' // Replace with your exact Vercel URL
    ],
    credentials: true // This allows the cookies to pass through
  })
)

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/invitations', invitationRoutes)

/*
TEST ROUTE
*/
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Wedding Invitation API Running'
  })
})

export default app
