import jwt from 'jsonwebtoken'

import UserModel
from '../models/User.js'

async function authMiddleware(

  req,

  res,

  next

) {

  try {

    /*
    GET TOKEN
    */

    const token =
      req.cookies.token

    if (!token) {

      return res.status(401).json({

        success: false,

        message:
          'Unauthorized'

      })

    }

    /*
    VERIFY TOKEN
    */

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      )

    /*
    FIND USER
    */

    const user =
      await UserModel.findById(

        decoded.id

      )

    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          'User not found'

      })

    }

    /*
    ATTACH USER
    */

    req.user = user

    next()

  } catch (error) {

    console.log(error)

    res.status(401).json({

      success: false,

      message:
        'Invalid token'

    })

  }

}

export default authMiddleware