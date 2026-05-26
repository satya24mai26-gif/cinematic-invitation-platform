import { motion } from 'framer-motion'

import ganesha from '../../assets/gods/ganesha.png'

import headerToran from '../../assets/decorations/header-toran.png'

import templeArch from '../../assets/temples/temple-arch.png'

import floralDivider from '../../assets/decorations/floral-divider.png'

import corner from '../../assets/decorations/corner.png'

import coupleFrame from '../../assets/frames/couple-frame.png'

import coupleImage from '../../assets/couples/couple.png'

import { useInvitation } from '../../context/InvitationContext'

import getTheme from '../../utils/getTheme'

import {

  formatWeddingDate,

  getWeddingDay,

  formatWeddingTime


}
from '../../utils/formatWeddingDate'


function InvitationHero({ selectedSide }) {

  const { data } = useInvitation()

  const currentTheme = getTheme(selectedSide)

  const groom = data.couple.groom;

  const bride = data.couple.bride;

  const wedding = data.wedding;

  const formattedDate =
  formatWeddingDate(

    data?.wedding?.date

  )

const weddingDay =
  getWeddingDay(

    data?.wedding?.date

  )

const formattedTime =
  formatWeddingTime(

    data?.wedding?.time

  )


  return (
    <section
      className="relative overflow-hidden min-h-screen"
      style={{
        background: currentTheme.background,
      }}
    >
      {/* TOP TORAN */}

      <img
        src={headerToran}
        alt=""
        className="absolute top-0 left-0 w-full z-30"
      />

      {/* TEMPLE ARCH */}

      <img
        src={templeArch}
        alt=""
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] opacity-10 z-0"
      />

      {/* CORNERS */}

      <img src={corner} alt="" className="absolute top-0 left-0 w-[75px]" />

      <img
        src={corner}
        alt=""
        className="absolute top-0 right-0 w-[75px] scale-x-[-1]"
      />

      {/* MANDALA GLOW */}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-yellow-200/30 blur-3xl"></div>

      {/* FLOWERS */}

      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute top-32 left-10 text-pink-400 text-5xl"
      >
        ✿
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-44 right-12 text-yellow-600 text-4xl"
      >
        ❀
      </motion.div>

      {/* MAIN CONTENT */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        {/* GANESHA */}

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex justify-center"
        >
          <img src={ganesha} alt="" className="w-[180px] md:w-[240px]" />
        </motion.div>

        {/* INVITATION TEXT */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <p
            className="tracking-[6px] uppercase text-sm md:text-lg"
            style={{
              color: currentTheme.colors.primary
            }}
          >
            Traditional Wedding Invitation
          </p>

          <h1
            className="mt-10 text-6xl md:text-8xl font-bold leading-tight"
            style={{
              color: currentTheme.colors.primary,
            }}
          >
            {groom.name}
            <div className="text-yellow-600 text-5xl md:text-7xl my-4">❤</div>
            {bride.name}
          </h1>

          <p
            className="mt-10 max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed"
            style={{
              color: currentTheme.colors.secondary,
            }}
          >
            Together with our families, we request the honor of your presence to
            celebrate our sacred wedding ceremony.
          </p>
        </motion.div>

        {/* DIVIDER */}

        <div className="flex justify-center mt-16">
          <img src={floralDivider} alt="" className="w-[320px]" />
        </div>

        {/* COUPLE FRAME */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="relative">
            {/* FRAME */}

            <img src={coupleFrame} alt="" className="w-[380px] md:w-[520px] blur-2xl" />

            {/* PLACEHOLDER IMAGE */}

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.img
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 5 }}
                src={coupleImage}
                alt=""
                className="w-[260px] md:w-[340px] object-cover rounded-[30px]"
              />
            </div>
          </div>
        </motion.div>

        {/* DATE */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-24 text-center"
        >
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{
              color: currentTheme.colors.primary,
            }}
          >
            {formattedDate}
          </h2>

          <p className="mt-6 text-2xl text-zinc-700">
          {weddingDay} • {formattedTime}
          </p>

          <p className="mt-4 text-xl text-zinc-600">{wedding.venue}</p>
        </motion.div>
      </div>
    </section>
  );
}

export default InvitationHero