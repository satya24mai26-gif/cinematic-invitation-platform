import { motion } from "framer-motion";

import floralDivider from "../../assets/decorations/floral-divider.png";
import getTheme from '../../utils/getTheme'
import { useInvitation } from '../../context/InvitationContext'

function EventsSection() {

  const {
    data,
    selectedSide
  } = useInvitation()

  const filteredEvents =
  data.events.filter(event =>

    event.side === 'common' ||

    event.side === selectedSide

  )

  const events = filteredEvents

  const currentTheme = getTheme(selectedSide)

  return (
    <section id="events" className="relative overflow-hidden py-28 px-6"
    style={{
      background: currentTheme.background
    }}
    >
      {/* Glow */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      {/* Main Content */}

      <div className="relative z-10 max-w-6xl mx-auto">
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
              color: currentTheme.colors.primary
            }}
          >
            Wedding Events
          </h2>

          <p
            className="mt-8 text-xl md:text-2xl"
              style={{
            color: currentTheme.colors.primary
          }}
          >
            Join us in celebrating these beautiful moments filled with love,
            blessings, and joyful traditions.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="mt-24 space-y-12">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white rounded-[40px] shadow-2xl border border-yellow-100 p-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
                {/* Number */}

                <div className="flex justify-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                    style={{
                      color: currentTheme.colors.primary
                    }}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Event Details */}

                <div className="md:col-span-3">
                  <h3
                    className="text-3xl font-bold"
                    style={{
                      color: currentTheme.colors.primary
                    }}
                  >
                    {event.title}
                  </h3>

                  <div className="mt-6 space-y-3 text-lg text-zinc-700">
                    <p>📅 {event.date}</p>

                    <p>⏰ {event.time}</p>

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <p>📍 {event.location}</p>

                      <a
                        href={event.mapLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-5 py-2 rounded-full text-sm font-semibold transition"
                        style={{
                          color: currentTheme.colors.primary,
                          background: currentTheme.colors.secondary
                        }}
                      >
                        View Location
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsSection;
