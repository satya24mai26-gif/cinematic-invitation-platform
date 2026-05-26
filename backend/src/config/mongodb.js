import mongoose from 'mongoose'

async function connectMongoDB() {

  try {

    await mongoose.connect(
      process.env.MONGODB_URI
    )

    console.log(
      'MongoDB Connected'
    )

  } catch (error) {

    console.log(error)

    process.exit(1)

  }

}

export default connectMongoDB