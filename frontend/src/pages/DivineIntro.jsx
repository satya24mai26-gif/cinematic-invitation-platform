import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

import { useEffect } from 'react'

import { useParams, useSearchParams } from "react-router-dom"

import { useInvitation } from '../context/InvitationContext'

import { divineTheme } from '../data/themeConfig'

import ganesha from '../assets/gods/ganesha.png'

function DivineIntro() {

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { data, selectedSide: contextSide } = useInvitation();
  let selectedSide = contextSide;
  selectedSide = searchParams.get('side') ?? selectedSide

  const navigate = useNavigate()
  useEffect(() => {

    const timer = setTimeout(() => {
  
      navigate(`/${slug}/invitation?side=${selectedSide}`)
  
    }, data?.godIntro?.duration || 4000)
  
    return () => clearTimeout(timer)
  
  }, [data?.godIntro?.duration, navigate, selectedSide, slug])
  
  const divineIntro = divineTheme[data?.godIntro?.god] || divineTheme.ganesha

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
    >

      {/* Background Glow */}

      <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl"></div>

      {/* Content */}

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >

        {/* Symbol */}

        <motion.div
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-[120px] md:text-[180px] text-yellow-400"
        >
          <img src={divineIntro.src ?? ganesha} alt="" className="w-[180px] md:w-[240px]" />
          
        </motion.div>

        {/* Main Title */}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 text-4xl md:text-6xl font-bold text-yellow-400"
        >
          {divineIntro.title ?? "Shri Ganeshaaya Namaha"}
        </motion.h1>

        {/* Subtitle */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-6 text-yellow-500 text-lg md:text-2xl max-w-3xl leading-relaxed"
        >
          {divineIntro.discription ?? "With the blessings of Lord Ganesha, we invite you to celebrate this sacred wedding journey."}
        </motion.p>

      </motion.div>

    </div>
  )
}

export default DivineIntro
