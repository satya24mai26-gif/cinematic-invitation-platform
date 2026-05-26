import { motion } from 'framer-motion'

import floralDivider from '../../assets/decorations/floral-divider.png'

import { useInvitation } from '../../context/InvitationContext'

import getTheme from '../../utils/getTheme'


function FamilySection({ selectedSide }) {
  
  const { data } = useInvitation()

  const groom = data?.couple?.groom;

  const bride = data?.couple?.bride;

  const currentTheme = getTheme(selectedSide)

  return (

    <section id="family" className="relative overflow-hidden py-28 px-6"
    style={{
      background: currentTheme.background,
    }}
    >

      {/* Soft Glow */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      {/* Main Content */}

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        {/* Divider */}

        <div className="flex justify-center">

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
          className="mt-14 text-5xl md:text-7xl font-bold"
          style={{
            color: currentTheme.colors.primary
          }}
        >
          Family Blessings
        </motion.h2>

        {/* Subtitle */}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-xl md:text-2xl leading-relaxed"
            style={{
              color: currentTheme.colors.secondary
            }}
        >

          With the blessings of our beloved parents,
          elders, relatives, and well-wishers,
          we joyfully invite you to celebrate
          this sacred union and share your love and blessings.

        </motion.p>

        {/* Families */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-20">

          {/* Groom Family */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white rounded-[40px] shadow-2xl p-12 border border-yellow-100"
          >

            <h3 className="text-4xl font-bold text-orange-900">
              Groom Family
            </h3>

            <div className="mt-10 space-y-6 text-xl text-zinc-700">

              <p>{groom.father}</p>

              <p>{groom.mother}</p>

              <p>Family & Relatives</p>

            </div>

          </motion.div>

          {/* Bride Family */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white rounded-[40px] shadow-2xl p-12 border border-pink-100"
          >

            <h3 className="text-4xl font-bold currentTheme.colors.primary">
              Bride Family
            </h3>

            <div className="mt-10 space-y-6 text-xl text-zinc-700">

              <p>{bride.father}</p>

              <p>{bride.mother}</p>

              <p>Family & Relatives</p>

            </div>

          </motion.div>

        </div>

      </div>

    </section>

  )
}

export default FamilySection