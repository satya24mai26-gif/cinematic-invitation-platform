import mongoose from 'mongoose'

const UserSchema =
  new mongoose.Schema(

    {

      email: {

        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true

      },

      password: {

        type: String,

        required: true

      },

      isVerified: {

        type: Boolean,

        default: false

      },

      otp: {

        type: String,

        default: null

      },

      otpExpires: {

        type: Date,

        default: null

      },

      role: {

        type: String,

        enum: ['user', 'admin'],

        default: 'user'

      },

      invitation: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Invitation',

        default: null

      }

    },

    {

      timestamps: true

    }

  )

const UserModel =
  mongoose.model(
    'User',
    UserSchema
  )

export default UserModel