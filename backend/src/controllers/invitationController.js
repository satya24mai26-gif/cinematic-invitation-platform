import InvitationModel
  from '../models/InvitationModel.js'




/*
CREATE
*/

export async function createInvitation(

  req,

  res

) {
  try {
    const slug = `invite-${Date.now()}`;

    const invitation = await InvitationModel.create({
      owner: req.user._id,

      slug,

      title: "My Invitation",

      couple: {
        groom: "",

        bride: "",
      },

      gallery: [],

      events: [],

      story: '',

      blessings: [],

      family: {
        groomSide: [],

        brideSide: [],
      },
    });

    res.status(201).json({
      success: true,

      data: invitation,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
}


/*
GET BY SLUG
*/

export async function getInvitationBySlug(
  req,
  res
) {

  try {

    const invitation =
      await InvitationModel.findOne({

        slug: req.params.slug

      })

    if (!invitation) {

      return res.status(404).json({

        success: false,

        message:
          'Invitation not found'

      })

    }

    res.json({

      success: true,

      data: invitation

    })

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    })

  }

}




/*
DELETE
*/

export async function deleteInvitation(
  req,
  res
) {

  try {

    const invitation =
      await InvitationModel.findOne({

        slug: req.params.slug

      })

    if (!invitation) {

      return res.status(404).json({

        success: false,

        message:
          'Invitation not found'

      })

    }

    /*
    OWNERSHIP CHECK
    */

    /*
OLD INVITATION SUPPORT
*/

if (!invitation.owner) {

  invitation.owner =
    req.user._id

  await invitation.save()

}

/*
OWNERSHIP CHECK
*/

/*
ADMIN CAN DELETE ANYTHING
*/

const isAdmin =

  req.user.role === 'admin'

/*
OWNER CHECK
*/

const isOwner =

  invitation.owner?.toString()

  ===

  req.user._id.toString()

if (

  !isAdmin &&

  !isOwner

) {

  return res.status(403).json({

    success: false,

    message:
      'Forbidden'

  })

}

    await invitation.deleteOne()

    res.json({

      success: true,

      message:
        'Invitation deleted'

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message: error.message

    })

  }

}

export async function getAllInvitations(
  req,
  res
) {

  try {

    const invitations =
      await InvitationModel.find()
      .sort({ updatedAt: -1 })

    res.json({

      success: true,

      data: invitations

    })

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    })

  }

}

/* update */

export async function updateInvitation(
  req,
  res
) {

  try {

    /*
    FIND INVITATION
    */

    const invitation =
      await InvitationModel.findOne({

        slug: req.params.slug

      })

    if (!invitation) {

      return res.status(404).json({

        success: false,

        message:
          'Invitation not found'

      })

    }

    /*
    OWNERSHIP CHECK
    */

   /*
OLD INVITATION SUPPORT
*/

if (!invitation.owner) {

  invitation.owner =
    req.user._id

  await invitation.save()

}

/*
OWNERSHIP CHECK
*/

if (

  invitation.owner.toString()

  !==

  req.user._id.toString()

) {

  return res.status(403).json({

    success: false,

    message:
      'Access denied'

  })

}

    /*
    UPDATE
    */

    Object.assign(

      invitation,

      req.body

    )

    await invitation.save()

    res.json({

      success: true,

      data: invitation

    })

  } catch (error) {

    console.log(
      'UPDATE ERROR:',
      error
    )

    res.status(500).json({

      success: false,

      message: error.message

    })

  }

}

/*
GET MY INVITATION
*/

export async function
getMyInvitation(

  req,

  res

) {

  try {

    const invitation =
      await InvitationModel.findOne({

        owner:
          req.user._id

      })

    if (!invitation) {

      return res.status(404).json({

        success: false,

        message:
          'Invitation not found'

      })

    }

    res.json({

      success: true,

      data: invitation

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      message:
        'Failed to fetch invitation'

    })

  }

}