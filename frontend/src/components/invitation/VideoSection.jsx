import { motion } from 'framer-motion'

import floralDivider from '../../assets/decorations/floral-divider.png'

import getTheme from '../../utils/getTheme'

import { useInvitation } from '../../context/InvitationContext'

import buildMediaUrl from '../../utils/mediaSourceParser'

function VideoSection({ selectedSide }) {
  const { data } = useInvitation()


  const videos =
  data?.videos?.filter(
    video => video.enabled !== false
  ) || []

  const currentTheme = getTheme(selectedSide)

  return (
    <section id="videos"
      className="relative overflow-hidden py-28 px-6"
      style={{
        background: currentTheme.background,
      }}
    >
      {/* Glow */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      {/* Main Content */}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Divider */}

        <div className="flex justify-center">
          <img src={floralDivider} alt="" className="w-[300px]" />
        </div>

        {/* Title */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2
            className="mt-14 text-5xl md:text-7xl font-bold"
            style={{
              color: currentTheme.colors.primary,
            }}
          >
            Wedding Films
          </h2>

          <p
            className="mt-8 text-xl md:text-2xl"
            style={{
              color: currentTheme.colors.secondary,
            }}
          >
            Watch our beautiful cinematic moments, memories, celebrations, and
            love story unfold.
          </p>
        </motion.div>

        {/* Videos */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-24">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-yellow-100"
            >
              {/* Video */}

              <div className="relative aspect-video rounded-[30px] overflow-hidden">
                {/* UPLOADED VIDEO */}

                {(video.sourceType === "upload" || video.sourceType === "github" ) ? (
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
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  ></iframe>
                )}
              </div>

              {/* Details */}

              <div className="p-8">
                <h3
                  className="text-3xl font-bold"
                  style={{
                    color: currentTheme.colors.primary,
                  }}
                >
                  {video.title}
                </h3>

                <p className="mt-4 text-zinc-600 text-lg">
                  Cinematic wedding memories beautifully captured forever.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoSection