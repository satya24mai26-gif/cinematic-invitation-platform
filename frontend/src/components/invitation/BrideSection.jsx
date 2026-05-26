import { motion } from 'framer-motion'
import { useInvitation } from '../../context/InvitationContext'
import getTheme from '../../utils/getTheme'

import {randomBrideImage} from '../../utils/randomImages'

function BrideSection() {
  const { data } = useInvitation()
  const bride = data?.couple?.bride
  const currentTheme = getTheme("bride")

  return (
    <section id='bride'
      className="relative overflow-hidden py-28 px-6 md:px-12"
      style={{
        background: currentTheme.background,
      }}
    >
      {/* Background Glow */}

      {/* Soft Traditional Glow */}

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

      {/* Content */}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Decorative Divider */}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5 }}
          className="flex items-center justify-center mb-20"
        >
          <div className="h-[2px] w-24 bg-pink-500"></div>

          <div
            className="mx-8 text-5xl"
            style={{ color: currentTheme.colors.accent }}
          >
            ✿
          </div>

          <div className="h-[2px] w-24 bg-pink-500"></div>
        </motion.div>

        {/* Main Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <p
              className=" tracking-[6px] uppercase text-sm md:text-lg"
              style={{
                color: currentTheme.colors.accent,
              }}
            >
              The Bride
            </p>

            <h2 className="mt-8 text-5xl md:text-7xl font-bold leading-tight"
            style={{
              color:
                currentTheme.colors.primary
            }}
            >
              {bride.name}
            </h2>

            <p
              className="mt-10 text-xl leading-relaxed"
              style={{
                color: currentTheme.colors.secondary,
              }}
            >
              A graceful soul whose smile reflects love, warmth, tradition, and
              the beauty of sacred celebrations.
            </p>

            {/* Parents */}

            <div className="mt-14 space-y-8">
              <div>
                <h3
                  className="text-2xl font-bold "
                  style={{
                    color: currentTheme.colors.accent,
                  }}
                >
                  Father
                </h3>

                <p className="mt-3 text-xl"
                style={{
                  color:
                    currentTheme.colors.primary
                }}
                >
                  {bride.father}
                </p>
              </div>

              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{
                    color: currentTheme.colors.accent,
                  }}
                >
                  Mother
                </h3>

                <p className="mt-3 text-xl"
                style={{
                  color:
                    currentTheme.colors.primary
                }}
                >
                  {bride.mother}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Decorative Glow */}

            <div
              className="absolute w-[350px] h-[350px] rounded-full blur-3xl"
              style={{
                background: `${currentTheme.colors.primary}33`,
              }}
            ></div>

            {/* Bride Artwork */}

            <div
              className="relative z-10 w-[320px] h-[520px] rounded-[40px] overflow-hidden border-[3px] border-pink-500/40 shadow-2xl flex items-center justify-center"
              style={{
                background: currentTheme.colors.soft,
                borderColor: currentTheme.colors.accent,
              }}
            >
              <div className="text-center px-6">
                <div className="text-8xl">
                  <img
                    src={bride?.image}
                    alt="couple"
                    className="w-[250px] h-[350px] object-cover rounded-2xl"
                  />
                </div>

                <p
                  className="mt-10 text-xl"
                  style={{ color: currentTheme.colors.text }}
                >
                  Animated Bride Artwork
                </p>

                <p className="mt-4 text-zinc-500">
                  Theme artwork, bride image, or cinematic animation will appear
                  here.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BrideSection