import { motion } from 'framer-motion'

import floralDivider from '../../assets/decorations/floral-divider.png'

import ganesha from '../../assets/gods/ganesha.png'

import getTheme from '../../utils/getTheme'

import { useInvitation } from '../../context/InvitationContext'

import {

  formatWeddingDate,

  getWeddingDay,

  formatWeddingTime

}
from '../../utils/formatWeddingDate'

function SaveTheDateSection({ selectedSide }) {


  const { data } = useInvitation()

  const currentTheme = getTheme(selectedSide)

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

    <section id='saveTheDate' className="relative overflow-hidden py-32 px-6"
    style={{
      background: currentTheme.background
    }}
    >

      {/* Glow */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      {/* Main Content */}

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Ganesha */}

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="flex justify-center"
        >

          <img
            src={ganesha}
            alt=""
            className="w-[160px] md:w-[220px]"
          />

        </motion.div>

        {/* Divider */}

        <div className="flex justify-center mt-10">

          <img
            src={floralDivider}
            alt=""
            className="w-[300px]"
          />

        </div>

        {/* Title */}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-16 text-5xl md:text-7xl font-bold"
          style={{
            color: currentTheme.colors.primary
          }}
        >
          Save The Date
        </motion.h2>

        {/* Couple Names */}

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-4xl md:text-6xl font-bold leading-tight"
          style={{
            color: currentTheme.colors.secondary
          }}
        >

          {data.couple.groom.name}

          <div className="text-yellow-600 text-5xl my-6">
            ❤
          </div>

          {data.couple.bride.name}

        </motion.h3>

        {/* Blessings */}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-xl md:text-2xl leading-[2.2]"
          style={{
            color: currentTheme.colors.secondary
          }}
        >

          Your presence, love, and blessings
          will make our wedding celebration
          truly memorable and sacred.
          We look forward to celebrating
          this beautiful journey with you.

        </motion.p>

        {/* Date */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >

          <div className="inline-block bg-white rounded-[40px] shadow-2xl px-16 py-12 border border-yellow-100">

            <h4
              className="text-4xl md:text-5xl font-bold"
              style={{
                color: currentTheme.colors.primary
              }}
            >
              {formattedDate}
            </h4>

            <p className="mt-6 text-2xl text-zinc-700">
            {weddingDay} •  {formattedTime}
            </p>

          </div>

        </motion.div>

        {/* Final Quote */}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 text-zinc-600 italic text-xl"
        >

          “Two souls, one sacred journey,
          united forever through love and blessings.”

        </motion.p>

      </div>

    </section>

  )
}

export default SaveTheDateSection