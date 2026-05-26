import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

import { useInvitation } from '../context/InvitationContext'

import randomCoupleImage from '../assets/couples/couple.png'

import { useParams } from "react-router-dom"

import { useEffect } from "react";

import { getInvitation } from "../services/invitationService";

function LandingPage() {
  const { slug } =
     useParams()
  const navigate = useNavigate()

  const { data, setSelectedSide, setData } =
    useInvitation()
  
  useEffect(() => {
  
      if (!slug) return
    
      async function loadInvitation() {
    
        try {
    
          const invitation =
            await getInvitation(slug)
          setData(invitation)
    
        } catch (error) {
    
          console.log(error)
    
        }
    
      }
    
      loadInvitation()
    
    }, [slug])

  const { bride, groom } =
    data.couple || ''

  function handleSideSelect(side) {

    setSelectedSide(side)

    navigate( `/${slug}/divine-intro?side=${side}`)

  }
console.log(data)
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[#fff8f0]"></div>

      {/* GLOW BLOBS */}

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
        }}
      />

      <motion.div
        animate={{
          x: [0, -70, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
        className="absolute bottom-[-150px] right-[-100px] w-[420px] h-[420px] rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, #f472b6 0%, transparent 70%)",
        }}
      />

      {/* SHIMMER */}

      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] animate-pulse"></div>

      {/* MAIN CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        className="relative z-10 w-full max-w-4xl rounded-[50px] backdrop-blur-xl bg-white/40 border border-white/50 shadow-[0_20px_80px_rgba(0,0,0,0.12)] p-10 md:p-16 text-center"
      >
        {/* COUPLE IMAGE */}

        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="relative mx-auto w-[240px] h-[240px]"
        >
          {/* GLOW */}

          <div className="absolute inset-0 rounded-full blur-3xl opacity-40 bg-pink-300"></div>

          <img
            src={data?.landingPage?.coupleImage ?? randomCoupleImage}
            alt="Couple"
            className="relative z-10 w-full h-full object-cover rounded-full border-[8px] border-white shadow-2xl"
          />
        </motion.div>

        {/* TEXT */}

        <p className="mt-10 tracking-[8px] uppercase text-sm md:text-base text-orange-700">
          Together With Families
        </p>

        <div className="relative flex items-center justify-center mt-4">
          <div className="mt-4 flex justify-center">
            <div
              className="
      text-5xl md:text-7xl
      text-pink-600
      select-none
    "
            >
              {data?.landingPage?.title}
            </div>
          </div>
        </div>

        {/* DETAILS */}

        <div className="mt-10 space-y-3">
          <p className="text-xl md:text-2xl text-zinc-700">
            {data.wedding?.date || ''}
          </p>

          <p className="text-lg md:text-xl text-zinc-500">
            {data.wedding?.venue}
          </p>
        </div>

        {/* BUTTONS */}

        <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-6">
          <button
            onClick={() => handleSideSelect("bride")}
            className="px-10 py-4 rounded-full bg-pink-500/90 text-white text-lg font-semibold shadow-xl hover:scale-105 transition duration-300"
          >
            Bride Side
          </button>

          <button
            onClick={() => handleSideSelect("groom")}
            className="px-10 py-4 rounded-full bg-orange-500/90 text-white text-lg font-semibold shadow-xl hover:scale-105 transition duration-300"
          >
            Groom Side
          </button>
        </div>

        {/* BLESSING */}

        <p className="mt-14 text-zinc-500 italic text-lg">
          “Two souls, one sacred journey, blessed with love and tradition.”
        </p>
      </motion.div>
    </div>
  );

}

export default LandingPage