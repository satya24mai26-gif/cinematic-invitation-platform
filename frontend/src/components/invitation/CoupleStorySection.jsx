import { motion } from 'framer-motion'

import floralDivider from '../../assets/decorations/floral-divider.png'
import getTheme from '../../utils/getTheme'
import { useInvitation } from '../../context/InvitationContext'

function CoupleStorySection({ selectedSide }) {
  const { data } = useInvitation()
  const currentTheme = getTheme(selectedSide)

  return (

    <section id='story' className="relative overflow-hidden py-28 px-6"
    style={{
      background: currentTheme.background
    }}
    >

      {/* Soft Glow */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

      {/* Main Content */}

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Divider */}

        <div className="flex justify-center">

          <img
            src={floralDivider}
            alt=""
            className="w-[280px]"
          />

        </div>

        {/* Title */}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-14 text-5xl md:text-7xl font-bold"
          style={{
            color: currentTheme.colors.primary
          }}
        >
          Our Story
        </motion.h2>

        {/* Story */}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-xl md:text-2xl leading-[2.2]"
          style={{
            color: currentTheme.colors.secondary
          }}
        >

          {data.story}

        </motion.p>

        {/* Decorative Symbol */}

        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="mt-20 text-7xl"
        >
          🕊
        </motion.div>

      </div>

    </section>

  )
}

export default CoupleStorySection