import express from 'express'

import {

  register,

  verifyOTP,

  login,

  logout,

  getMe,

  verifyLoginOTP,

  resendLoginOTP,

  resendOTP

} from '../controllers/authController.js'

import authMiddleware
from '../middleware/authMiddleware.js'

import InvitationModel
from '../models/InvitationModel.js'

const router =
  express.Router()

  /*
GET ALL INVITATIONS
*/

router.get(

  '/',

  authMiddleware,

  async (req, res) => {

    try {

      if (req.user.role !== 'admin') {

        return res.status(403).json({

          success: false,

          message:
            'Admin access required'

        })

      }

      const invitations =
        await InvitationModel.find()

      res.json({

        success: true,

        data: invitations

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

        message:
          'Failed to fetch invitations'

      })

    }

  }

)



/*
REGISTER
*/

router.post(

  '/register',

  register

)



/*
VERIFY OTP
*/

router.post(

  '/verify-otp',

  verifyOTP

)


router.post(

  '/resend-otp',

  resendOTP

)

router.post(

  '/resend-login-otp',

  resendLoginOTP

)



/*
LOGIN
*/

router.post(

  '/login',

  login

)



router.post(

  '/verify-login-otp',

  verifyLoginOTP

)



/*
LOGOUT
*/

router.post(

  '/logout',

  logout

)

/*
CURRENT USER
*/

router.get(

    '/me',
  
    authMiddleware,
  
    getMe
  
  )

export default router
