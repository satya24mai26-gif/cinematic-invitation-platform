
import { updateInvitation } from "../services/invitationService";
import { useInvitation } from "../context/InvitationContext";
import { useState } from 'react'
import themeConfig from '../data/themeConfig'
import buildMediaUrl from '../utils/mediaSourceParser'
import normalizeMediaUrl from "../utils/normalizeMediaUrl";
import { useEffect } from "react";
import { useParams }  from 'react-router-dom'
import { getInvitation } from "../services/invitationService";

const currentTheme = themeConfig.appTheme

function BuilderPage() {
  const {setData, data } = useInvitation();
  
  const safeData = {

    couple: {
  
      groom: {
  
        name: '',
  
        father: '',
  
        mother: '',
  
        image: ''
  
      },
  
      bride: {
  
        name: '',
  
        father: '',
  
        mother: '',
  
        image: ''
  
      }
  
    },
  
    wedding: {
  
      date: '',
  
      time: '',
  
      venue: ''
  
    },
  
    landingPage: {
  
      title: '',
  
      subtitle: '',
  
      welcomeText: '',
  
      backgroundImage: '',
  
      coupleImage: ''
  
    },
  
    godIntro: {
  
      god: 'ganesha',
  
      duration: 5
  
    },
  
    theme: {
  
      brideSideTheme: 'brideTheme',
  
      groomSideTheme: 'groomTheme'
  
    },
  
    sections: {},
  
    sectionOrder: [],
  
    gallery: [],
  
    videos: [],
  
    events: [],
  
    liveGalleries: []
  
  }

  const normalizedData = {

    ...safeData,
  
    ...data,
  
    couple: {
  
      ...safeData.couple,
  
      ...data?.couple,
  
      groom: {
  
        ...safeData.couple.groom,
  
        ...data?.couple?.groom
  
      },
  
      bride: {
  
        ...safeData.couple.bride,
  
        ...data?.couple?.bride
  
      }
  
    },
  
    wedding: {
  
      ...safeData.wedding,
  
      ...data?.wedding
  
    },
  
    landingPage: {
  
      ...safeData.landingPage,
  
      ...data?.landingPage
  
    },
  
    godIntro: {
  
      ...safeData.godIntro,
  
      ...data?.godIntro
  
    },
  
    theme: {
  
      ...safeData.theme,
  
      ...data?.theme
  
    }
  
  }
  

  const { slug } =
  useParams()

  useEffect(() => {

    async function loadInvitation() {
  
      try {
  
        const invitation =
          await getInvitation(slug, { preview: true })
  
        setData(invitation)
  
      } catch (error) {
  
        console.log(error)
  
      }
  
    }
  
    loadInvitation()
  
  }, [setData, slug])



  const [videoTitle, setVideoTitle] = useState('')

  const [videoUrl, setVideoUrl] = useState("");

  const [videoMode, setVideoMode] =
  useState('url')

  const [uploadedVideo, setUploadedVideo] =
  useState(null)

  const [eventForm, setEventForm] =
  useState({

    title: '',

    description: '',

    side: 'common',

    date: '',

    time: '',

    venue: '',

    mapLink: ''

  })

  const [liveGalleryForm, setLiveGalleryForm] =
  useState({

    enabled: true,

    title: '',

    description: '',

    folderUrl: '',

    coverImage: ''

  })

  const [galleryUrl, setGalleryUrl] =
  useState('')

  function moveSectionUp(index) {

    if (index === 0) return
  
    const updated = [...data.sectionOrder]
  
    ;[
      updated[index - 1],
      updated[index]
    ] = [
      updated[index],
      updated[index - 1]
    ]
  
    setData(prev => ({
  
      ...prev,
  
      sectionOrder: updated
  
    }))
  
  }
  
  function moveSectionDown(index) {
  
    if (
      index === data.sectionOrder.length - 1
    ) return
  
    const updated = [...data.sectionOrder]
  
    ;[
      updated[index + 1],
      updated[index]
    ] = [
      updated[index],
      updated[index + 1]
    ]
  
    setData(prev => ({
  
      ...prev,
  
      sectionOrder: updated
  
    }))
  
  }


  function addGalleryImage() {

    if (!galleryUrl) return
  
    const normalizedUrl =
      normalizeMediaUrl(galleryUrl)
  
    setData(prev => ({
  
      ...prev,
  
      gallery: [
  
        ...(prev.gallery || []),
  
        {
  
          image: normalizedUrl,
  
          title: '',
  
          enabled: true
  
        }
  
      ]
  
    }))
  
    setGalleryUrl('')
  
  }

  function removeGalleryImage(index) {

    const updated =
      [...data.gallery]
  
    updated.splice(index, 1)
  
    setData(prev => ({
  
      ...prev,
  
      gallery: updated
  
    }))
  
  }
  
  function moveGalleryLeft(index) {
  
    if (index === 0) return
  
    const updated =
      [...data.gallery]
  
    ;[
      updated[index - 1],
      updated[index]
    ] = [
      updated[index],
      updated[index - 1]
    ]
  
    setData(prev => ({
  
      ...prev,
  
      gallery: updated
  
    }))
  
  }
  
  function moveGalleryRight(index) {
  
    if (
      index === data.gallery.length - 1
    ) return
  
    const updated =
      [...data.gallery]
  
    ;[
      updated[index + 1],
      updated[index]
    ] = [
      updated[index],
      updated[index + 1]
    ]
  
    setData(prev => ({
  
      ...prev,
  
      gallery: updated
  
    }))
  
  }
  
  function extractMediaSource(url) {

    /* YOUTUBE */
  
    const youtubeRegex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
  
    const youtubeMatch =
      url.match(youtubeRegex)
  
    if (youtubeMatch) {
  
      return {
  
        sourceType: 'youtube',
  
        sourceId: youtubeMatch[1]
  
      }
  
    }
  
    /* GOOGLE DRIVE */
  
    const driveRegex =
      /drive\.google\.com\/file\/d\/([^/]+)/
  
    const driveMatch =
      url.match(driveRegex)
  
    if (driveMatch) {
  
      return {
  
        sourceType: 'googleDrive',
  
        sourceId: driveMatch[1]
  
      }
  
    }
    console.log(url)
    if (url.includes("https://raw.githubusercontent.com")) {
      console.log("i got sucess vs")
      return {
        sourceType: "github",
        sourceId: url
      }
  }

  
    /* UNKNOWN */
  
    return {
  
      sourceType: '',
  
      sourceId: url
  
    }
  
  }

  /* 
  useEffect(() => {

 
  
    if (!data?.slug) return
  
   
  
    const timer = setTimeout(
  
      async () => {
  
        try {
  
          await updateInvitation(
  
            data.slug,
  
            data
  
          )
  
          console.log(
            'Auto Saved'
          )
  
        } catch (error) {
  
          console.log(error)
  
        }
  
      },
  
      41500
  
    )
  
   
  
    return () =>
      clearTimeout(timer)
  
  }, [data])

  */

  
  function removeVideo(index) {
  
    const updated =
      [...data.videos]
  
    updated.splice(index, 1)
  
    setData(prev => ({
  
      ...prev,
  
      videos: updated
  
    }))
  
  }

  function addVideo() {

    if (!videoTitle) return
  
    /* URL MODE */
  
    if (videoMode === 'url') {

      const normalizedVideoUrl = normalizeMediaUrl(videoUrl)
  
      const media =
        extractMediaSource(normalizedVideoUrl)
  
      setData(prev => ({
  
        ...prev,
  
        videos: [
  
          ...(prev.videos || []),
  
          {
  
            title: videoTitle,
  
            sourceType:
              media.sourceType,
  
            sourceId:
              media.sourceId
  
          }
  
        ]
  
      }))
  
    }
  
    /* UPLOAD MODE */
  
    if (
      videoMode === 'upload' &&
      uploadedVideo
    ) {
  
      const videoUrl =
        URL.createObjectURL(
          uploadedVideo
        )
  
      setData(prev => ({
  
        ...prev,
  
        videos: [
  
          ...(prev.videos || []),
  
          {
  
            title: videoTitle,
  
            sourceType: 'upload',
  
            sourceId: videoUrl
  
          }
  
        ]
  
      }))
  
    }
  
    /* RESET */
  
    setVideoTitle('')
  
    setVideoUrl('')
  
    setUploadedVideo(null)
  
  }

  function moveVideoUp(index) {

    if (index === 0) return
  
    const updated = [...data.videos]
  
    ;[
      updated[index - 1],
      updated[index]
    ] = [
      updated[index],
      updated[index - 1]
    ]
  
    setData(prev => ({
  
      ...prev,
  
      videos: updated
  
    }))
  
  }
  
  function moveVideoDown(index) {
  
    if (
      index === data.videos.length - 1
    ) return
  
    const updated = [...data.videos]
  
    ;[
      updated[index + 1],
      updated[index]
    ] = [
      updated[index],
      updated[index + 1]
    ]
  
    setData(prev => ({
  
      ...prev,
  
      videos: updated
  
    }))
  
  }


  function handleChange(section, field, value) {
    setData((prev) => ({
      ...prev,

      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }

  function addEvent() {

    if (
      !eventForm.title ||
      !eventForm.date
    ) return
  
    setData(prev => ({
  
      ...prev,
  
      events: [
  
        ...prev.events,
  
        {
  
          ...eventForm
  
        }
  
      ]
  
    }))
  
    setEventForm({
  
      title: '',
  
      description: '',
  
      side: 'common',
  
      date: '',
  
      time: '',
  
      venue: '',
  
      mapLink: ''
  
    })
  
  }
  
  function removeEvent(index) {
  
    const updated =
      [...data.events]
  
    updated.splice(index, 1)
  
    setData(prev => ({
  
      ...prev,
  
      events: updated
  
    }))
  
  }
  
  function moveEventUp(index) {
  
    if (index === 0) return
  
    const updated =
      [...data.events]
  
    ;[
      updated[index - 1],
      updated[index]
    ] = [
      updated[index],
      updated[index - 1]
    ]
  
    setData(prev => ({
  
      ...prev,
  
      events: updated
  
    }))
  
  }
  
  function moveEventDown(index) {
  
    if (
      index === data.events.length - 1
    ) return
  
    const updated =
      [...data.events]
  
    ;[
      updated[index + 1],
      updated[index]
    ] = [
      updated[index],
      updated[index + 1]
    ]
  
    setData(prev => ({
  
      ...prev,
  
      events: updated
  
    }))
  
  }

  function addLiveGallery() {

    if (
      !liveGalleryForm.title ||
      !liveGalleryForm.folderUrl
    ) return
  
    setData(prev => ({
  
      ...prev,
  
      liveGalleries: [
  
        ...(prev.liveGalleries || []),
  
        {
  
          ...liveGalleryForm
  
        }
  
      ]
  
    }))
  
    setLiveGalleryForm({
  
      enabled: true,
  
      title: '',
  
      description: '',
  
      folderUrl: '',
  
      coverImage: ''
  
    })
  
  }
  
  function removeLiveGallery(index) {
  
    const updated =
      [...data.liveGalleries]
  
    updated.splice(index, 1)
  
    setData(prev => ({
  
      ...prev,
  
      liveGalleries: updated
  
    }))
  
  }
  
  function moveLiveGalleryUp(index) {
  
    if (index === 0) return
  
    const updated =
      [...data.liveGalleries]
  
    ;[
      updated[index - 1],
      updated[index]
    ] = [
      updated[index],
      updated[index - 1]
    ]
  
    setData(prev => ({
  
      ...prev,
  
      liveGalleries: updated
  
    }))
  
  }
  
  function moveLiveGalleryDown(index) {
  
    if (
      index ===
      data.liveGalleries.length - 1
    ) return
  
    const updated =
      [...data.liveGalleries]
  
    ;[
      updated[index + 1],
      updated[index]
    ] = [
      updated[index],
      updated[index + 1]
    ]
  
    setData(prev => ({
  
      ...prev,
  
      liveGalleries: updated
  
    }))
  
  }
  
  function toggleLiveGallery(index) {
  
    const updated =
      [...data.liveGalleries]
  
    updated[index].enabled =
      !updated[index].enabled
  
    setData(prev => ({
  
      ...prev,
  
      liveGalleries: updated
  
    }))
  
  }

  async function handleSaveInvitation() {

    try {
  
      await updateInvitation(
  
        data.slug,
  
        data
  
      )
  
      alert(
        'Invitation Saved Successfully'
      );
      console.log(
        'Invitation Saved Successfully')
  
    } catch (error) {
  
      console.log(error)
  
      alert(
        'Save Failed'
      )
  
    }
  
  }

  function togglePublished() {

    setData(prev => ({

      ...prev,

      published:
        !prev.published

    }))

  }

  async function copyShareLink() {

    const shareUrl =
      `${window.location.origin}/${data.slug}`

    try {

      await navigator.clipboard.writeText(shareUrl)

      alert('Invitation link copied')

    } catch {

      window.prompt(
        'Copy invitation link',
        shareUrl
      )

    }

  }
  let dynamicSectionOrder =
  data?.sectionOrder || []


  if (

    dynamicSectionOrder.length === 0
  
  ) {
  
    dynamicSectionOrder = []
  
    /*
    HERO
    */
  
    if (
  
      data?.landingPage
  
    ) {
  
      dynamicSectionOrder.push(
  
        'hero'
  
      )
  
    }
  
    /*
    COUPLE
    */
  
    if (
  
      data?.couple?.groom?.name
  
    ) {
  
      dynamicSectionOrder.push(
  
        'groom'
  
      )
  
    }

    if ( data?.couple?.bride?.name)
    {
      dynamicSectionOrder.push(
  
        'bride'
      )
    }
  
    /*
    EVENTS
    */
  
    if (
  
      data?.events?.length > 0
  
    ) {
  
      dynamicSectionOrder.push(
  
        'events'
  
      )
  
    }
  
    /*
    GALLERY
    */
  
    if (
  
      data?.gallery?.length > 0
  
    ) {
  
      dynamicSectionOrder.push(
  
        'gallery'
  
      )
  
    }
  
  }

  return (
    <div
      className="min-h-screen px-6 py-20"
      style={{
        background: currentTheme.background,
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* TITLE */}

        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-orange-900">
            Invitation Builder
          </h1>

          <p className="mt-6 text-xl text-orange-700">
            Create your cinematic traditional wedding invitation.
          </p>
        </div>

        <div className="mt-10 bg-white rounded-[32px] shadow-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-orange-500">
              Publishing
            </p>

            <h2 className="mt-2 text-2xl font-bold text-orange-900">
              {data?.published === false ? 'Private Draft' : 'Public Invitation'}
            </h2>

            <p className="mt-2 text-zinc-500 break-all">
              {data?.slug ? `${window.location.origin}/${data.slug}` : 'Save once to create a shareable link.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={togglePublished}
              className={`px-5 py-3 rounded-2xl font-bold ${
                data?.published === false
                  ? 'bg-zinc-900 text-white'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {data?.published === false ? 'Publish' : 'Unpublish'}
            </button>

            <button
              type="button"
              onClick={copyShareLink}
              className="px-5 py-3 rounded-2xl bg-orange-100 text-orange-900 font-bold"
            >
              Copy Link
            </button>
          </div>
        </div>

        {/* FORM */}

        <div className="mt-20 space-y-16">
          
          {/* GROOM */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-orange-900">
              Groom Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <input
                type="text"
                placeholder="Groom Name"
                value={data?.couple?.groom?.name || ''}
                onChange={(e) =>
                  handleChange("couple", "groom", {
                    ...normalizedData.couple.groom,
                    name: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Father Name"
                value={data?.couple?.groom?.father || ''}
                onChange={(e) =>
                  handleChange("couple", "groom", {
                    ...normalizedData.couple.groom,
                    father: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Mother Name"
                value={data?.couple?.groom?.mother || ''}
                onChange={(e) =>
                  handleChange("couple", "groom", {
                    ...normalizedData.couple.groom,
                    mother: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              <div className="md:col-span-2">
                <label className="block text-lg font-semibold text-zinc-700 mb-4">
                  Groom Image
                </label>

                <input
                  type="text"
                  placeholder="Groom Image URL"
                  value={data?.couple?.groom?.image || ""}
                  onChange={(e) =>
                    handleChange(
                      "couple",

                      "groom",

                      {
                        ...normalizedData.couple.groom,

                        image: normalizeMediaUrl(e.target.value),
                      }
                    )
                  }
                  className="
    border
    border-orange-200
    rounded-2xl
    px-6
    py-4
    outline-none
    md:col-span-2
  "
                />

                {data?.couple?.groom.image && (
                  <img
                    src={normalizeMediaUrl(data?.couple?.groom?.image)}
                    alt="Groom Preview"
                    className="
      mt-6
      w-full
      max-w-[250px]
      h-[320px]
      object-cover
      rounded-[30px]
      border
      border-orange-200
    "
                  />
                )}
              </div>
            </div>
          </div>

          {/* BRIDE */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-pink-900">Bride Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <input
                type="text"
                placeholder="Bride Name"
                value={data?.couple?.bride?.name || ''}
                onChange={(e) =>
                  handleChange("couple", "bride", {
                    ...normalizedData.couple.bride,
                    name: e.target.value,
                  })
                }
                className="border border-pink-200 rounded-2xl px-6 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Father Name"
                value={data?.couple?.bride?.father || ''}
                onChange={(e) =>
                  handleChange("couple", "bride", {
                    ...normalizedData.couple.bride,
                    father: e.target.value,
                  })
                }
                className="border border-pink-200 rounded-2xl px-6 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Mother Name"
                value={data?.couple?.bride?.mother || ''}
                onChange={(e) =>
                  handleChange("couple", "bride", {
                    ...normalizedData.couple.bride,
                    mother: e.target.value,
                  })
                }
                className="border border-pink-200 rounded-2xl px-6 py-4 outline-none"
              />
              <div className="md:col-span-2">
                <label className="block text-lg font-semibold text-zinc-700 mb-4">
                  Bride Image
                </label>

                <input
                  type="text"
                  placeholder="Bride Image URL"
                  value={data?.couple?.bride?.image || ""}
                  onChange={(e) =>
                    handleChange(
                      "couple",

                      "bride",

                      {
                        ...normalizedData.couple.bride,

                        image: normalizeMediaUrl(e.target.value),
                      }
                    )
                  }
                  className="
    border
    border-pink-200
    rounded-2xl
    px-6
    py-4
    outline-none
    md:col-span-2
  "
                />

                {data?.couple?.bride?.image && (
                  <img
                    src={normalizeMediaUrl(data?.couple?.bride?.image)}
                    alt="Bride Preview"
                    className="
      mt-6
      w-full
      max-w-[250px]
      h-[320px]
      object-cover
      rounded-[30px]
      border
      border-pink-200
    "
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-orange-900">
              Wedding Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <input
                type="date"
                placeholder="Wedding Date"
                value={data?.wedding?.date || ''}
                onChange={(e) =>
                  handleChange("wedding", "date", e.target.value)
                }
                className="border border-yellow-200 rounded-2xl px-6 py-4 outline-none"
              />

              <input
                type="time"
                placeholder="Wedding Time"
                value={data?.wedding?.time || ''}
                onChange={(e) =>
                  handleChange("wedding", "time", e.target.value)
                }
                className="border border-yellow-200 rounded-2xl px-6 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Wedding Venue"
                value={data?.wedding?.venue || ''}
                onChange={(e) =>
                  handleChange("wedding", "venue", e.target.value)
                }
                className="border border-yellow-200 rounded-2xl px-6 py-4 outline-none md:col-span-2"
              />
            </div>
          </div>

          {/* LANDING PAGE SETTINGS */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-orange-900">Landing Page</h2>

            <div className="grid grid-cols-1 gap-6 mt-10">
              <input
                type="text"
                placeholder="Landing Title"
                value={data?.landingPage?.title || ''}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,

                    landingPage: {
                      ...(prev.landingPage || {}),

                      title: e.target.value,
                    },
                  }))
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Subtitle"
                value={data?.landingPage?.subtitle || ''}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,

                    landingPage: {
                      ...(prev.landingPage || {}),

                      subtitle: e.target.value,
                    },
                  }))
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              <textarea
                placeholder="Welcome Text"
                value={data?.landingPage?.welcomeText || ''}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,

                    landingPage: {
                      ...(prev.landingPage || {}),

                      welcomeText: e.target.value,
                    },
                  }))
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none min-h-[120px]"
              />

              <input
                type="text"
                placeholder="Background Image URL / optional"
                value={data?.landingPage?.backgroundImage ||''}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,

                    landingPage: {
                      ...(prev.landingPage || {}),

                      backgroundImage: normalizeMediaUrl(e.target.value),
                    },
                  }))
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

<input
            type="text"
            placeholder="Couple Image URL"
            value={data?.landingPage?.coupleImage||''}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,

                landingPage: {
                  ...(prev.landingPage || {}),

                  coupleImage: normalizeMediaUrl(e.target.value),
                },
              }))
            }
            className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
          />
          {data?.landingPage?.coupleImage && (
            <img
              src={data?.landingPage?.coupleImage}
              alt="Couple Preview"
              className="
      mt-6
      w-[220px]
      h-[220px]
      object-cover
      rounded-full
    "
            />
          )}

            </div>
          </div>

          {/* DIVINE INTRO */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-orange-900">Divine Intro</h2>

            <div className="grid grid-cols-1 gap-6 mt-10">
              <select
                value={data?.godIntro?.god ||''}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,

                    godIntro: {
                      ...(prev.godIntro || {}),

                      god: e.target.value,
                    },
                  }))
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              >
                <option value="ganesha">Ganesha</option>

                <option value="krishna">Krishna</option>

                <option value="shiva">Shiva</option>
              </select>

              <input
                type="number"
                placeholder="Duration"
                value={data?.godIntro?.duration||''}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,

                    godIntro: {
                      ...(prev.godIntro || {}),

                      duration: Number(e.target.value),
                    },
                  }))
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />
            </div>
          </div>

          {/* THEME SETTINGS */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-orange-900">
              Theme Settings
            </h2>

            <div className="mt-10 space-y-8">
              {/* Bride Theme */}

              <div>
                <label className="block text-lg font-semibold text-zinc-700 mb-3">
                  Bride Side Theme
                </label>

                <select
                  value={data?.theme?.brideSideTheme ||''}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,

                      theme: {
                        ...(prev.theme || {}),
                        brideSideTheme: e.target.value,
                      },
                    }))
                  }
                  className="w-full border border-pink-200 rounded-2xl px-6 py-4 outline-none"
                >
                  <option value="brideTheme">Bride Theme</option>

                  <option value="traditional">Traditional Theme</option>

                  <option value="royalTheme">Royal Theme</option>

                  <option value="krishnaTheme">Krishna Theme</option>
                </select>
              </div>

              {/* Groom Theme */}

              <div>
                <label className="block text-lg font-semibold text-zinc-700 mb-3">
                  Groom Side Theme
                </label>

                <select
                  value={data?.theme?.groomSideTheme ||''}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,

                      theme: {
                        ...(prev.theme || {}),
                        groomSideTheme: e.target.value,
                      },
                    }))
                  }
                  className="w-full border border-yellow-200 rounded-2xl px-6 py-4 outline-none"
                >
                  <option value="groomTheme">Groom Theme</option>

                  <option value="traditional">Traditional Theme</option>

                  <option value="royalTheme">Royal Theme</option>

                  <option value="krishnaTheme">Krishna Theme</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION VISIBILITY */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-orange-900">
              Section Visibility
            </h2>

            <div className="mt-10 space-y-6">
              {Object.keys(data?.sections || {}).map((sectionKey) => (
                <label
                  key={sectionKey}
                  className="flex items-center justify-between"
                >
                  <span className="text-lg capitalize text-zinc-700">
                    {sectionKey}
                  </span>

                  <input
                    type="checkbox"
                    checked={Boolean(data?.sections?.[sectionKey])}
                    onChange={() =>
                      setData((prev) => ({
                        ...prev,

                        sections: {
                          ...prev.sections,

                          [sectionKey]: !prev.sections[sectionKey],
                        },
                      }))
                    }
                    className="w-6 h-6"
                  />
                </label>
              ))}
            </div>
          </div>
          {/* SECTION ORDER */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-orange-900">
              Section Order
            </h2>

            <div className="mt-10 space-y-5">
              {dynamicSectionOrder.map((section, index) => (
                <div
                  key={section}
                  className="flex items-center justify-between border border-orange-100 rounded-2xl px-6 py-4"
                >
                  <span className="capitalize text-lg text-zinc-700">
                    {section}
                  </span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => moveSectionUp(index)}
                      className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900"
                    >
                      ↑
                    </button>

                    <button
                      onClick={() => moveSectionDown(index)}
                      className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* GALLERY MANAGER */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-orange-900">
              Gallery Manager
            </h2>

            <div className="mt-10">
              <div className="flex items-center gap-4 mb-4">
                <label className="block text-lg font-semibold text-zinc-700">
                  Gallery Image URL
                </label>

                <a
                  href="https://github.com"
                  target="_blank"
                  className="text-blue-500 text-xl"
                >
                  ⓘ
                </a>
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Paste GitHub / Direct Image URL"
                  value={galleryUrl}
                  onChange={(e) => setGalleryUrl(e.target.value)}
                  className="flex-1 border border-orange-200 rounded-2xl px-6 py-4 outline-none"
                />

                <button
                  onClick={addGalleryImage}
                  className="
        px-6
        py-4
        rounded-2xl
        bg-orange-100
        text-orange-900
        font-bold
      "
                >
                  Add
                </button>
              </div>

              <p className="mt-4 text-sm text-zinc-500">
                Supports GitHub URLs, raw image links, Firebase URLs, Cloudinary
                URLs, and direct CDN image links.
              </p>
            </div>

            {/* Preview */}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
              {(data?.gallery || []).map((image, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden border border-orange-100 bg-white"
                >
                  {/* IMAGE */}

                  <img
                    src={normalizeMediaUrl(
                      typeof image === "string" ? image : image.image
                    )}
                    alt=""
                    className="w-full h-[180px] object-cover"
                  />

                  {/* CONTROLS */}

                  <div className="flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={() => moveGalleryLeft(index)}
                      className="px-3 py-2 rounded-xl bg-orange-100 text-orange-900"
                    >
                      ←
                    </button>

                    <button
                      onClick={() => moveGalleryRight(index)}
                      className="px-3 py-2 rounded-xl bg-orange-100 text-orange-900"
                    >
                      →
                    </button>

                    <button
                      onClick={() => removeGalleryImage(index)}
                      className="px-3 py-2 rounded-xl bg-red-100 text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* VIDEO MANAGER */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-orange-900">
              Video Manager
            </h2>

            {/* INPUTS */}

            {/* INPUTS */}

            <div className="grid grid-cols-1 gap-6 mt-10">
              {/* TITLE */}

              <input
                type="text"
                placeholder="Video Title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              {/* MODE SELECT */}

              <select
                value={videoMode}
                onChange={(e) => setVideoMode(e.target.value)}
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              >
                <option value="url">Video URL</option>

                <option value="upload">Upload Video</option>
              </select>

              {/* URL MODE */}

              {videoMode === "url" && (
                <input
                  type="text"
                  placeholder="YouTube / Google Drive URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
                />
              )}

              {/* UPLOAD MODE */}

              {videoMode === "upload" && (
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setUploadedVideo(e.target.files[0])}
                  className="w-full border border-orange-200 rounded-2xl px-6 py-4"
                />
              )}

              {/* BUTTON */}

              <button
                onClick={addVideo}
                className="px-6 py-4 rounded-2xl bg-orange-100 text-orange-900 font-bold"
              >
                Add Video
              </button>
            </div>

            {/* VIDEO LIST */}

            <div className="mt-10 space-y-5">
              {data?.videos?.map((video, index) => (
                <div
                  key={index}
                  className="border border-orange-100 rounded-[30px] overflow-hidden bg-white"
                >
                  {/* VIDEO PREVIEW */}
                  {video.sourceType === "upload" ||
                  video.sourceType === "github" ? (
                    <video
                      src={video.sourceId}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                    >
                      <source src={video.sourceId} type="video/mp4" />
                    </video>
                  ) : (
                    /* YOUTUBE / DRIVE */

                    <iframe
                      src={buildMediaUrl(video.sourceType, video.sourceId)}
                      title={video.title}
                      className="w-full h-[240px]"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  )}

                  {/* CONTENT */}

                  <div className="p-5">
                    <h3 className="font-bold text-orange-900 text-xl">
                      {video.title}
                    </h3>

                    <p className="text-zinc-500 text-sm mt-2 break-all">
                      {video.url}
                    </p>

                    {/* CONTROLS */}

                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => moveVideoUp(index)}
                        className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900"
                      >
                        ↑
                      </button>

                      <button
                        onClick={() => moveVideoDown(index)}
                        className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900"
                      >
                        ↓
                      </button>

                      <button
                        onClick={() => removeVideo(index)}
                        className="px-4 py-2 rounded-xl bg-red-100 text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* EVENT MANAGER */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-orange-900">
              Event Manager
            </h2>

            {/* FORM */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* TITLE */}

              <input
                type="text"
                placeholder="Event Title"
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,

                    title: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              {/* SIDE */}

              <select
                value={eventForm.side}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,

                    side: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              >
                <option value="common">Common Event</option>

                <option value="bride">Bride Side</option>

                <option value="groom">Groom Side</option>
              </select>

              {/* DATE */}

              <input
                type="text"
                placeholder="Event Date"
                value={eventForm.date}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,

                    date: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              {/* TIME */}

              <input
                type="text"
                placeholder="Event Time"
                value={eventForm.time}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,

                    time: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              {/* VENUE */}

              <input
                type="text"
                placeholder="Venue"
                value={eventForm.venue}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,

                    venue: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              {/* MAP */}

              <input
                type="text"
                placeholder="Google Maps Link"
                value={eventForm.mapLink}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,

                    mapLink: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              {/* DESCRIPTION */}

              <textarea
                placeholder="Event Description"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,

                    description: e.target.value,
                  })
                }
                className="md:col-span-2 border border-orange-200 rounded-2xl px-6 py-4 outline-none min-h-[120px]"
              />
            </div>

            {/* BUTTON */}

            <button
              onClick={addEvent}
              className="mt-8 px-8 py-4 rounded-2xl bg-orange-100 text-orange-900 font-bold"
            >
              Add Event
            </button>

            {/* EVENTS LIST */}

            <div className="mt-12 space-y-6">
              {data?.events?.map((event, index) => (
                <div
                  key={index}
                  className="border border-orange-100 rounded-[30px] p-6 bg-white"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-2xl font-bold text-orange-900">
                        {event.title}
                      </h3>

                      <p className="mt-2 text-zinc-500">{event.description}</p>

                      <div className="mt-5 space-y-2 text-zinc-600">
                        <p>📅 {event.date}</p>

                        <p>⏰ {event.time}</p>

                        <p>📍 {event.venue}</p>

                        <p className="capitalize">👥 {event.side}</p>
                      </div>
                    </div>

                    {/* CONTROLS */}

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => moveEventUp(index)}
                        className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900"
                      >
                        ↑
                      </button>

                      <button
                        onClick={() => moveEventDown(index)}
                        className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900"
                      >
                        ↓
                      </button>

                      <button
                        onClick={() => removeEvent(index)}
                        className="px-4 py-2 rounded-xl bg-red-100 text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* LIVE GALLERY MANAGER */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10 mt-10">
            <h2 className="text-4xl font-bold text-orange-900">
              Live Gallery Manager
            </h2>

            {/* FORM */}

            <div className="grid grid-cols-1 gap-6 mt-10">
              {/* TITLE */}

              <input
                type="text"
                placeholder="Gallery Title"
                value={liveGalleryForm.title}
                onChange={(e) =>
                  setLiveGalleryForm({
                    ...liveGalleryForm,

                    title: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              {/* DESCRIPTION */}

              <textarea
                placeholder="Gallery Description"
                value={liveGalleryForm.description}
                onChange={(e) =>
                  setLiveGalleryForm({
                    ...liveGalleryForm,

                    description: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none min-h-[120px]"
              />

              {/* URL */}

              <input
                type="text"
                placeholder="Google Drive Folder URL"
                value={liveGalleryForm.folderUrl}
                onChange={(e) =>
                  setLiveGalleryForm({
                    ...liveGalleryForm,

                    folderUrl: e.target.value,
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              {/* COVER */}

              <input
                type="text"
                placeholder="Optional Cover Image URL"
                value={liveGalleryForm.coverImage}
                onChange={(e) =>
                  setLiveGalleryForm({
                    ...liveGalleryForm,

                    coverImage: normalizeMediaUrl(e.target.value),
                  })
                }
                className="border border-orange-200 rounded-2xl px-6 py-4 outline-none"
              />

              {/* ENABLE */}

              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={liveGalleryForm.enabled}
                  onChange={(e) =>
                    setLiveGalleryForm({
                      ...liveGalleryForm,

                      enabled: e.target.checked,
                    })
                  }
                  className="w-5 h-5"
                />

                <p className="text-lg text-zinc-700">Enable Gallery</p>
              </div>

              {/* BUTTON */}

              <button
                onClick={addLiveGallery}
                className="px-8 py-4 rounded-2xl bg-orange-100 text-orange-900 font-bold"
              >
                Add Live Gallery
              </button>
            </div>

            {/* LIST */}

            <div className="mt-12 space-y-6">
              {data?.liveGalleries?.map((gallery, index) => (
                <div
                  key={index}
                  className="border border-orange-100 rounded-[30px] p-6 bg-white"
                >
                  <div className="flex items-start justify-between gap-6">
                    {/* INFO */}

                    <div>
                      <h3 className="text-2xl font-bold text-orange-900">
                        {gallery.title}
                      </h3>

                      <p className="mt-3 text-zinc-500">
                        {gallery.description}
                      </p>

                      <div className="mt-5 space-y-2 text-zinc-600">
                        <p>🔗 {gallery.folderUrl}</p>

                        <p>👁 {gallery.enabled ? "Enabled" : "Disabled"}</p>
                      </div>
                    </div>

                    {/* CONTROLS */}

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => moveLiveGalleryUp(index)}
                        className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900"
                      >
                        ↑
                      </button>

                      <button
                        onClick={() => moveLiveGalleryDown(index)}
                        className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900"
                      >
                        ↓
                      </button>

                      <button
                        onClick={() => toggleLiveGallery(index)}
                        className="px-4 py-2 rounded-xl bg-yellow-100 text-yellow-800"
                      >
                        Toggle
                      </button>

                      <button
                        onClick={() => removeLiveGallery(index)}
                        className="px-4 py-2 rounded-xl bg-red-100 text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveInvitation}
            className="
    fixed
    bottom-5
    right-5
    z-[999999]
    bg-black
    text-white
    px-6
    py-4
    rounded-2xl
  "
          >
            Save Invitation
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage
