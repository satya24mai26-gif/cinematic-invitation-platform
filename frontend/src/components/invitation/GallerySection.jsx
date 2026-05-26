import { motion } from 'framer-motion'

import floralDivider from '../../assets/decorations/floral-divider.png'

import getTheme from '../../utils/getTheme'

import { useInvitation } from '../../context/InvitationContext'


function GallerySection({ selectedSide }) {

  const { data } = useInvitation()

  const images =
  data.gallery?.filter(
    image => image.enabled
  ) || []

  const currentTheme = getTheme(selectedSide)

  return (
    <section id="gallery" className="relative overflow-hidden py-28 px-6"
    style={{
      background: currentTheme.background
    }}
    >
      {/* Glow */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

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
            className="mt-14 text-5xl md:text-7xl font-bold "
            style={{
              color: currentTheme.colors.primary,
            }}
          >
            Wedding Memories
          </h2>

          <p
            className="mt-8 text-xl md:text-2xl"
            style={{
              color: currentTheme.colors.primary
            }}
          >
            Beautiful moments captured with love, joy, blessings, and
            unforgettable memories.
          </p>
        </motion.div>

        {/* Gallery Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-24">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-[40px] overflow-hidden shadow-2xl border-[8px] border-white bg-white"
            >
              {/* Image */}

              <img
                src={image.image
                
                }
                alt=""
                className="w-full h-[420px] object-cover"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Floating Label */}

              <div className="absolute bottom-6 left-6">
                <div
                  className="px-5 py-2 rounded-full text-sm font-semibold"
                  style = {{
                    background: currentTheme.background,

                  }}
                >
                  Wedding Memory
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection