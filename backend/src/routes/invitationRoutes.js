import express from 'express'

import {

  getInvitationBySlug,

  updateInvitation,

  createInvitation,

  getAllInvitations,
  
  deleteInvitation,

  getMyInvitation

} from '../controllers/invitationController.js'

import authMiddleware
from '../middleware/authMiddleware.js'



const router = express.Router()




/*
GET ALL
*/

router.get(

  '/',

  authMiddleware,

  getAllInvitations

)



/*
GET MY INVITATION
*/

router.get(

  '/my',

  authMiddleware,

  getMyInvitation

)


/*
CREATE
*/

router.post(

  '/',

  authMiddleware,

  createInvitation

)



/*
GET BY SLUG
*/

router.get(
  '/:slug',
  getInvitationBySlug
)



/*
UPDATE
*/

router.put(

  '/:slug',

  authMiddleware,

  updateInvitation

)



/*
DELETE
*/


router.delete(

  '/:slug',

  authMiddleware,

  deleteInvitation

)



export default router