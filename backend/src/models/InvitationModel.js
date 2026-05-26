import mongoose from 'mongoose'



/*
─────────────────────────────
EVENT SCHEMA
─────────────────────────────
*/

const EventSchema =
  new mongoose.Schema({

    title: {
      type: String
    },

    description: {
      type: String
    },

    side: {

      type: String,

      enum: [
        'bride',
        'groom',
        'common'
      ],

      default: 'common'

    },

    date: {
      type: String
    },

    time: {
      type: String
    },

    venue: {
      type: String
    },

    mapLink: {
      type: String
    },

    coverImage: {
      type: String
    },

    enabled: {

      type: Boolean,

      default: true

    }

  })



/*
─────────────────────────────
GALLERY SCHEMA
─────────────────────────────
*/

const GallerySchema =
  new mongoose.Schema({

    image: {
      type: String
    },

    title: {
      type: String
    },

    enabled: {

      type: Boolean,

      default: true

    }

  })



/*
─────────────────────────────
VIDEO SCHEMA
─────────────────────────────
*/

const VideoSchema =
  new mongoose.Schema({

    title: {
      type: String
    },

    sourceType: {
      type: String
    },

    sourceId: {
      type: String
    },

    thumbnail: {
      type: String
    },

    enabled: {

      type: Boolean,

      default: true

    }

  })



/*
─────────────────────────────
LIVE GALLERY SCHEMA
─────────────────────────────
*/

const LiveGallerySchema =
  new mongoose.Schema({

    title: {
      type: String
    },

    description: {
      type: String
    },

    folderUrl: {
      type: String
    },

    coverImage: {
      type: String
    },

    enabled: {

      type: Boolean,

      default: true

    }

  })



/*
─────────────────────────────
MAIN INVITATION SCHEMA
─────────────────────────────
*/

const InvitationSchema =
  new mongoose.Schema(

    {

      owner: {

        type: mongoose.Schema.Types.ObjectId,
      
        ref: 'User',
      
        required: true
      
      },

      /*
      BASIC
      */

      slug: {

        type: String,

        required: true,

        unique: true

      },

      title: {
        type: String
      },

      description: {
        type: String
      },

      published: {

        type: Boolean,

        default: true

      },


      landingPage: {

        enabled: {
          type: Boolean,
          default: true
        },
      
        title: String,
      
        subtitle: String,
      
        welcomeText: String,
      
        backgroundImage: String,
      
        backgroundVideo: String,
      
        music: String,
      
        enterButtonText: String,

        coupleImage: String,
      
        showSideSelection: Boolean,
      
      },



      /*
      COUPLE
      */

      couple: {

        bride: {

          name: String,

          father: String,

          mother: String,

          image: String,

          description: String

        },

        groom: {

          name: String,

          father: String,

          mother: String,

          image: String,

          description: String

        }

      },



      /*
      WEDDING
      */

      wedding: {

        title: String,

        subtitle: String,

        date: String,

        time: String,

        venue: String,

        mapLink: String,

        description: String

      },



      /*
      STORY
      */

      story: {
        type: String,
        default: ''
      },



      /*
      EVENTS
      */

      events: [EventSchema],



      /*
      GALLERY
      */

      gallery: [GallerySchema],



      /*
      VIDEOS
      */

      videos: [VideoSchema],



      /*
      LIVE GALLERIES
      */

      liveGalleries: [
        LiveGallerySchema
      ],



      /*
      THEME
      */

      theme: {

        selectedTheme: String,
      
        brideSideTheme: String,
      
        groomSideTheme: String,
      
        godTheme: String
      
      },

      godIntro: {

        enabled: {
          type: Boolean,
          default: true
        },
      
        god: {
          type: String,
          default: 'ganesha'
        },
      
        duration: {
          type: Number,
          default: 4000
        }
      
      },



      /*
      SECTION CONTROL
      */

      sections: {

        hero: {

          type: Boolean,

          default: true

        },

        story: {

          type: Boolean,

          default: true

        },

        bride: {

          type: Boolean,

          default: true

        },

        groom: {

          type: Boolean,

          default: true

        },

        family: {

          type: Boolean,

          default: true

        },

        events: {

          type: Boolean,

          default: true

        },

        gallery: {

          type: Boolean,

          default: true

        },

        videos: {

          type: Boolean,

          default: true

        },

        liveMemories: {

          type: Boolean,

          default: true

        },

        saveTheDate: {

          type: Boolean,

          default: true

        }

      },



      /*
      SECTION ORDER
      */

      sectionOrder: [

        {
          type: String
        }

      ],



      /*
      SETTINGS
      */

      settings: {

        animations: {

          type: Boolean,

          default: true

        },

        intro: {

          type: Boolean,

          default: true

        },

        music: {

          type: Boolean,

          default: false

        },

        loader: {

          type: Boolean,

          default: true

        },

        particles: {

          type: Boolean,

          default: true

        },

        navigation: {

          type: Boolean,

          default: false

        }

      }


    },

    

    {

      timestamps: true

    }

  )



const InvitationModel =
  mongoose.model(
    'Invitation',
    InvitationSchema
  )



export default InvitationModel