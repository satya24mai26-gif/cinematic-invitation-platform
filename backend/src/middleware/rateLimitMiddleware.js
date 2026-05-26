import rateLimit
from 'express-rate-limit'

export const otpLimiter =
  rateLimit({

    windowMs:
      10 * 60 * 1000,

    max: 5,

    message: {

      success: false,

      message:
        'Too many OTP requests. Try again later.'

    }

  })

export const loginLimiter =
  rateLimit({

    windowMs:
      15 * 60 * 1000,

    max: 10,

    message: {

      success: false,

      message:
        'Too many login attempts.'

    }

  })