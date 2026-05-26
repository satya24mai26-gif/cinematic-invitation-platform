import { motion } from 'framer-motion'

import { QRCodeSVG } from 'qrcode.react'

import { useInvitation } from '../../context/InvitationContext'

import getTheme from '../../utils/getTheme'

function LiveMemoriesSection() {

  const {
    data,
    selectedSide
  } = useInvitation()

  const currentTheme =
    getTheme(selectedSide)

  const liveGalleries =
    (data.liveGalleries || [])
      .filter(
        gallery => gallery.enabled
      )

    if (
        !liveGalleries.length
      ) return null

  return (
    <section id='liveMemories' className="relative py-32 px-6 overflow-hidden">
      {/* BACKGROUND */}

      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg,
              ${currentTheme.colors.soft},
              transparent)`,
        }}
      />

      {/* FLOATING GLOWS */}

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute top-10 left-10 w-[280px] h-[280px] rounded-full blur-3xl opacity-30"
        style={{
          background: currentTheme.colors.accent,
        }}
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
        className="absolute bottom-10 right-10 w-[260px] h-[260px] rounded-full blur-3xl opacity-20"
        style={{
          background: currentTheme.colors.secondary,
        }}
      />

      {/* MAIN CARD */}

      <div className="space-y-16">
        {liveGalleries.map((gallery, index) => (
          <motion.a
            key={index}
            href={gallery.folderUrl}
            target="_blank"
            rel="noreferrer"
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="relative z-10 max-w-6xl mx-auto rounded-[50px] backdrop-blur-xl border p-10 md:p-16 block cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.45)",

              borderColor: currentTheme.colors.soft,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* LEFT */}

              <div>
                {/* LIVE BADGE */}

                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>

                  <span
                    className="uppercase tracking-[5px] text-sm font-semibold"
                    style={{
                      color: currentTheme.colors.secondary,
                    }}
                  >
                    Memories Updating
                  </span>
                </div>

                {/* TITLE */}

                <h2
                  className="mt-8 text-5xl md:text-6xl font-bold leading-tight"
                  style={{
                    color: currentTheme.colors.primary,
                  }}
                >
                  {gallery.title}
                </h2>

                {/* DESCRIPTION */}

                <p
                  className="mt-8 text-xl leading-relaxed"
                  style={{
                    color: currentTheme.colors.text,
                  }}
                >
                  {gallery.description}
                </p>

                {/* BUTTON */}

                <button
                  className="mt-10 px-8 py-4 rounded-full text-white text-lg font-semibold shadow-2xl"
                  style={{
                    background: currentTheme.colors.secondary,
                  }}
                >
                  View Gallery
                </button>
              </div>

              {/* RIGHT */}

              <div className="flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="relative p-8 rounded-[40px] shadow-2xl"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                  }}
                >
                  {/* QR GLOW */}

                  <div
                    className="absolute inset-0 rounded-[40px] blur-2xl opacity-30"
                    style={{
                      background: currentTheme.colors.accent,
                    }}
                  />

                  {/* QR */}

                  <div className="relative z-10 bg-white p-6 rounded-[30px]">
                    <QRCodeSVG value={gallery.folderUrl} size={220} />
                  </div>

                  {/* TEXT */}

                  <p
                    className="mt-6 text-center text-lg font-semibold"
                    style={{
                      color: currentTheme.colors.primary,
                    }}
                  >
                    Scan To Explore Memories
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );

}

export default LiveMemoriesSection