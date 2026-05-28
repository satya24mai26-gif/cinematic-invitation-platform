import bcrypt from 'bcryptjs'

import UserModel
from '../models/User.js'

import InvitationModel
from '../models/InvitationModel.js'

import generateOTP
from '../utils/generateOTP.js'

import generateToken
from '../utils/generateToken.js'

import sendEmail
from '../utils/sendEmail.js'

import cookieOptions from '../utils/cookieOptions.js'



/*
─────────────────────────────
REGISTER
─────────────────────────────
*/

export async function register(

  req,

  res

) {

  try {
    const {
      email,

      password,
    } = req.body;

    /*
    VALIDATION
    */

    if (!email || !password) {
      return res.status(400).json({
        success: false,

        message: "Email and password required",
      });
    }

    /*
    CHECK EXISTING USER
    */

    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser) {

      if (

        !existingUser.isVerified
    
      ) {
    
        const otp =
          Math.floor(
    
            100000 +
    
            Math.random() * 900000
    
          ).toString()
    
        existingUser.otp = otp
    
        existingUser.otpExpires =
          Date.now() +
          10 * 60 * 1000
    
        await existingUser.save()
    
        await sendEmail(
    
          existingUser.email,
    
          'OTP Verification',
    
          `
    
            <h2>Your OTP Code</h2>
    
            <h1>${otp}</h1>
    
            <p>
    
              OTP valid for 10 minutes
    
            </p>
    
          `
    
        )
    
        return res.status(200).json({
    
          success: true,
    
          otpRequired: true,
    
          email:
            existingUser.email,
    
          message:
            'Account exists but not verified. New OTP sent.'
    
        })
    
      }
    

      return res.status(400).json({
        success: false,

        message: "User already exists",
      });
    }

    /*
    HASH PASSWORD
    */

    const hashedPassword = await bcrypt.hash(password, 10);

    /*
    DEVELOPER DEFAULT
    */

    const isDeveloper = email === "vs.invitations.love@gmail.com";

    /*
    GENERATE OTP
    */

    const otp = generateOTP();

    /*
    CREATE USER
    */

    const user = await UserModel.create({
      email,

      role: isDeveloper ? "admin" : "user",

      password: hashedPassword,

      isVerified: isDeveloper,

      otp: isDeveloper ? null : otp,

      otpExpires: isDeveloper ? null : Date.now() + 10 * 60 * 1000,
    });

    /*
    SEND EMAIL
    */

    if (!isDeveloper) {

    await sendEmail(
      email,

      "Invitation Platform OTP Verification",

      `
        <h2>Your OTP Code</h2>

        <h1>${otp}</h1>

        <p>
          OTP valid for 10 minutes
        </p>
      `
    );
    }

    res.status(201).json({
      success: true,

      developer: isDeveloper,

      message: isDeveloper
        ? "Developer account created"
        : "OTP sent successfully",
    });
  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message:
        'Registration failed'

    })

  }

}



/*
─────────────────────────────
VERIFY OTP
─────────────────────────────
*/

export async function verifyOTP(

  req,

  res

) {

  try {

    const {

      email,

      otp

    } = req.body

    /*
    FIND USER
    */

    const user =
      await UserModel.findOne({

        email

      })

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          'User not found'

      })

    }

    /*
    OTP CHECK
    */

    console.log(

      'REGISTER DATABASE OTP:',
    
      user.otp
    
    )
    
    console.log(
    
      'REGISTER ENTERED OTP:',
    
      otp
    
    )
    
    if (
    
      !user.otp ||
    
      user.otp.toString() !==
    
      otp.toString()
    
    ) {
    
      return res.status(400).json({
    
        success: false,
    
        message:
          'Invalid OTP'
    
      })
    
    }

    /*
    OTP EXPIRY
    */

    if (
      user.otpExpires <
      Date.now()
    ) {

      return res.status(400).json({

        success: false,

        message:
          'OTP expired'

      })

    }

    /*
    VERIFY USER
    */

    user.isVerified = true

    user.otp = null

    user.otpExpires = null

 /*
CHECK EXISTING INVITATION
*/

let invitation = null

if (

  user.invitation

) {

  invitation =
    await InvitationModel.findById(

      user.invitation

    )

}

/*
CREATE ONLY IF NOT EXISTS
*/

if (!invitation) {

  const slug =
    `invite-${Date.now()}`

  invitation =
    await InvitationModel.create({

      owner:
        user._id,

      slug,

      title:
        'My Invitation',

      couple: {

        groom: {

          name: ''

        },

        bride: {

          name: ''

        }

      },

      wedding: {

        date: '',

        time: '',

        venue: ''

      },

      gallery: [],

      events: [],

      story: '',

      sectionOrder: [],

      sections: {}

    })

  user.invitation =
    invitation._id

}

    await user.save()

    /*
    GENERATE TOKEN
    */

    const token =
      generateToken(
        user._id
      )

    /*
    COOKIE
    */

    res.cookie(

      'token',

      token,

      {

        httpOnly: true,

        secure:
          process.env.NODE_ENV
          === 'production',

        sameSite: 'lax',

        maxAge:
          2 *
          60 *
          60 *
          1000

      }

    )

    res.status(200).json({

      success: true,

      message:
        'OTP verified',

      slug:
        invitation.slug

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message:
        'OTP verification failed'

    })

  }

}



/*
─────────────────────────────
LOGIN
─────────────────────────────
*/

export async function login(

  req,

  res

) {

  try {

    const {

      email,

      password

    } = req.body

    /*
    FIND USER
    */

    const user =
      await UserModel.findOne({

        email

      })


    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          'User not found'

      })

    }


    const isAdmin = user.role === "admin";

    /*
    PASSWORD CHECK
    */

    const isMatch =
      await bcrypt.compare(

        password,

        user.password

      )

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message:
          'Invalid password'

      })

    }

    /*
    VERIFIED CHECK
    */

    if (!user.isVerified) {

      return res.status(400).json({

        success: false,

        message:
          'Please verify OTP first'

      })

    }

    /*
    GENERATE LOGIN OTP
    */

    if (isAdmin) {

      const token =
        generateToken(user._id)
    
      res.cookie(
    
        'token',
    
        token,
    
        cookieOptions
    
      )
    
      return res.json({
    
        success: true,

        otpRequired: false,

        message:

    'Login successful',
    
        data: user
    
      })
    
    }

    const otp =
      Math.floor(

        100000 +

        Math.random() * 900000

      ).toString()

    user.otp = otp

    user.otpExpires =
      Date.now() +
      10 * 60 * 1000

    await user.save()

    /*
    SEND EMAIL
    */

    await sendEmail(

      user.email,

      'Login OTP Verification',

      `

        <h2>Your Login OTP</h2>

        <h1>${otp}</h1>

        <p>

          OTP valid for 10 minutes

        </p>

      `

    )

    /*
    RESPONSE
    */

    return res.json({

      success: true,

      otpRequired: true,

      email: user.email,

      message:
        'OTP sent successfully'

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message:
        'Login failed'

    })

  }

}

export async function
verifyLoginOTP(

  req,

  res

) {

  try {

    const {

      email,

      otp

    } = req.body

    const user =
      await UserModel.findOne({

        email

      })

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          'User not found'

      })

    }

    
console.log(

  'USER EMAIL:',

  email

)

    console.log(

      'DATABASE OTP:',
    
      user.otp
    
    )
    
    console.log(
    
      'ENTERED OTP:',
    
      otp
    
    )

    if (

      !user.otp ||

      user.otp.toString() !== otp.toString()


    ) {

      return res.status(400).json({

        success: false,

        message:
          'Invalid OTP'

      })

    }

    if (

      user.otpExpires < Date.now()

    ) {

      return res.status(400).json({

        success: false,

        message:
          'OTP expired'

      })

    }

    user.otp = null

    user.otpExpires = null
    
    await user.save()
    
    const token =
      generateToken(
    
        user._id
    
      )
    
    res.cookie(
    
      'token',
    
      token,
    
      {
    
        httpOnly: true,
    
        secure:
          process.env.NODE_ENV
          === 'production',
    
        sameSite: 'lax',
    
        maxAge:
          2 *
          60 *
          60 *
          1000
    
      }
    
    )
    
    res.json({
    
      success: true,
    
      data: user
    
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message:
        'OTP verification failed'

    })

  }

}

/*
─────────────────────────────
LOGOUT
─────────────────────────────
*/

export async function logout(

  req,

  res

) {

  res.clearCookie('token')

  res.status(200).json({

    success: true,

    message:
      'Logged out'

  })

}

/*
─────────────────────────────
GET CURRENT USER
─────────────────────────────
*/

export async function getMe(

    req,
  
    res
  
  ) {
  
    try {
  
      const user =
        await UserModel.findById(
  
          req.user._id
  
        ).select('-password')
  
      res.status(200).json({
  
        success: true,
  
        data: user
  
      })
  
    } catch (error) {
  
      console.log(error)
  
      res.status(500).json({
  
        success: false,
  
        message:
          'Failed to fetch user'
  
      })
  
    }
  
  }

  export async function resendLoginOTP(

    req,
  
    res
  
  ) {
  
    try {
  
      const {
  
        email
  
      } = req.body
  
      const user =
        await UserModel.findOne({
  
          email
  
        })
  
      if (!user) {
  
        return res.status(404).json({
  
          success: false,
  
          message:
            'User not found'
  
        })
  
      }
  
      const otp =
        Math.floor(
  
          100000 +
  
          Math.random() * 900000
  
        ).toString()
  
      user.otp = otp
  
      user.otpExpires =
        Date.now() +
        10 * 60 * 1000
  
      await user.save()
  
      await sendEmail(
  
        user.email,
  
        'Resend Login OTP',
  
        `
  
          <h2>Your New OTP</h2>
  
          <h1>${otp}</h1>
  
          <p>
  
            OTP valid for 10 minutes
  
          </p>
  
        `
  
      )
  
      res.json({
  
        success: true,
  
        message:
          'OTP resent successfully'
  
      })
  
    } catch (error) {
  
      console.log(error)
  
      res.status(500).json({
  
        success: false,
  
        message:
          'Failed to resend OTP'
  
      })
  
    }
  
  }

  export async function resendOTP(

    req,
  
    res
  
  ) {
  
    try {
  
      const {
  
        email
  
      } = req.body
  
      const user =
        await UserModel.findOne({
  
          email
  
        })
  
      if (!user) {
  
        return res.status(404).json({
  
          success: false,
  
          message:
            'User not found'
  
        })
  
      }
  
      const otp =
        Math.floor(
  
          100000 +
  
          Math.random() * 900000
  
        ).toString()
  
      user.otp = otp
  
      user.otpExpires =
        Date.now() +
        10 * 60 * 1000
  
      await user.save()
  
      await sendEmail(
  
        user.email,
  
        'OTP Verification',
  
        `
  
          <h2>Your OTP Code</h2>
  
          <h1>${otp}</h1>
  
          <p>
  
            OTP valid for 10 minutes
  
          </p>
  
        `
  
      )
  
      res.json({
  
        success: true,
  
        message:
          'OTP resent successfully'
  
      })
  
    } catch (error) {
  
      console.log(error)
  
      res.status(500).json({
  
        success: false,
  
        message:
          'Failed to resend OTP'
  
      })
  
    }
  
  }
