import { motion } from 'framer-motion'

import floralDivider from '../../assets/decorations/floral-divider.png'
import getTheme from '../../utils/getTheme'
import { useInvitation } from '../../context/InvitationContext'


function GroomSection() {

  const { data } = useInvitation()

  const groom = data?.couple?.groom

  const currentTheme = getTheme("groom")

  return (
    <section id="groom"
      className="relative overflow-hidden py-28 px-6"
      style={{
        background: currentTheme.background,
      }}
    >
      {/* Glow */}

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

      {/* Main Content */}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Divider */}

        <div className="flex justify-center mb-20">
          <img src={floralDivider} alt="" className="w-[300px]" />
        </div>

        {/* Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* IMAGE SIDE */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow */}

              <div className="absolute inset-0 bg-yellow-200/30 blur-3xl rounded-full"></div>

              {/* Card */}

              <div className="relative z-10 w-[320px] h-[520px] rounded-[40px] border-[4px] border-yellow-200 bg-white shadow-2xl overflow-hidden flex items-center justify-center">
                <div className="text-center px-6">
                  <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                    className="text-8xl"
                  > 
                    <img
                      src={groom?.image}
                      className="w-[250px] h-[350px] object-cover rounded-2xl"
                    />
                  </motion.div>

                  <p className="mt-10 text-2xl text-orange-900 font-bold">
                    Groom Artwork
                  </p>

                  <p className="mt-4 text-zinc-600">
                    Groom image or cinematic artwork will render here
                    dynamically.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TEXT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="tracking-[6px] uppercase text-sm md:text-lg text-orange-700">
              The Groom
            </p>

            <h2 className="mt-8 text-5xl md:text-7xl font-bold text-orange-900 leading-tight">
              {groom.name}
            </h2>

            <p className="mt-10 text-xl leading-relaxed text-orange-800">
              A soul filled with kindness, strength, responsibility, and deep
              respect for family, tradition, and lifelong companionship.
            </p>

            {/* Parents */}

            <div className="mt-14 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-orange-700">Father</h3>

                <p className="mt-3 text-xl text-zinc-700">{groom.father}</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orange-700">Mother</h3>

                <p className="mt-3 text-xl text-zinc-700">{groom.mother}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GroomSection