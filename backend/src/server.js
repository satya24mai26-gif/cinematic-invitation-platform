import dotenv from 'dotenv'

dotenv.config()

console.log(process.env)

import app from './app.js'

import connectMongoDB
  from './config/mongodb.js'



const PORT =
  process.env.PORT || 5000



async function startServer() {

  await connectMongoDB()

  app.listen(PORT, () => {

    console.log(

      `Server running on port ${PORT}`

    )

  })

}

startServer()