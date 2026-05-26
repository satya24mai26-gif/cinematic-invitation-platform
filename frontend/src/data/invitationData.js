import randomCoupleImage from '../assets/couples/couple.png'
const invitationData = {
  slug: "satyavasavi",
  title: "Satya Weds Vasavi",
  theme: {
    selectedTheme: "traditional",
    brideSideTheme: "brideTheme",
    groomSideTheme: "groomTheme",
    godTheme: "radha-krishna",
  },

  godIntro: {
    enabled: true,

    god: "ganesha",

    duration: 4000,
  },

  couple: {
    groom: {
      name: "Satya",
      father: "Mr. Srinivas Rao",
      mother: "Mrs. Lakshmi Devi",
      image: "/src/assets/couples/groom/1.png",
    },

    bride: {
      name: "Vasavi",
      father: "Mr. Ramesh Kumar",
      mother: "Mrs. Lakshmi Devi",
      image: "/src/assets/couples/bride/1.png",
    },
  },
  gallery: [],

  wedding: {
    date: "25 February 2027",

    time: "6:30 PM",

    venue: "Sri Convention Hall, Hyderabad",

    mapLink: "https://maps.google.com",
  },

  story: `
      Two hearts, two families,
      and one beautiful sacred journey
      united forever through love,
      blessings, and tradition.
    `,

  events: [
    {
      title: "Mehendi Ceremony",
      date: "22 February 2027",
      time: "5:00 PM",
      side: "bride",
      location: "Bride Residence",
      mapLink: "https://maps.google.com",
    },

    {
      title: "Mehendi Ceremony",
      date: "22 February 2027",
      time: "6:00 PM",
      side: "groom",
      location: "Bride Residence",
      mapLink: "https://maps.google.com",
    },

    {
      title: "Haldi Ceremony",
      date: "23 February 2027",
      side: "common",
      time: "10:00 AM",
      location: "Family Hall",
      mapLink: "https://maps.google.com",
    },

    {
      title: "Wedding Ceremony",
      date: "25 February 2027",
      time: "6:30 PM",
      side: "common",
      location: "Sri Convention Hall",
      mapLink: "https://maps.google.com",
    },

    {
      title: "Reception",
      date: "26 February 2027",
      time: "7:00 PM",
      side: "common",
      location: "Grand Palace",
      mapLink: "https://maps.google.com",
    },
  ],

  videos: [
    {
      title: "Pre Wedding Teaser",
      sourceType: "youtube",
      sourceId: "piMABm1-Ru8",
    },

    {
      title: "Couple Journey",
      sourceType: "youtube",
      sourceId: "FZtvmKqoA_U",
    },
  ],

  liveGalleries: [
    {
      enabled: true,

      title: "Live Wedding Memories",

      description: "Fresh moments from our celebration are being shared live.",

      folderUrl:
        "https://drive.google.com/drive/folders/1O8Wxi18i769ED1Ixf63ScK-9XSB5oiLe",

      coverImage: "",
    },
  ],

  sections: {
    hero: true,

    story: true,

    bride: true,

    groom: true,

    family: true,

    events: true,

    gallery: true,

    videos: true,

    liveMemories: true,

    saveTheDate: true,
  },

  sectionOrder: [
    "hero",

    "story",

    "bride",

    "groom",

    "family",

    "events",

    "gallery",

    "videos",

    "liveMemories",

    "saveTheDate",
  ],

  blessings: `
      Your love, blessings, and presence
      will make our celebration
      truly memorable and sacred.
    `,

  landingPage: {
    enabled: true,

    title: "Satya Weds Vasavi",

    subtitle: "Together with families",

    welcomeText: "Welcome to our wedding celebration",

    backgroundImage: "",

    backgroundVideo: "",

    music: "",

    enterButtonText: "Enter Invitation",

    showSideSelection: true,

    coupleImage:
    randomCoupleImage
  }
};
  
  export default invitationData