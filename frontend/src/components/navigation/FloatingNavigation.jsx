import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'

import { useInvitation } from '../../context/InvitationContext'

import getTheme from '../../utils/getTheme'

function FloatingNavigation() {

  const {
    selectedSide
  } = useInvitation()

  const currentTheme =
    getTheme(selectedSide)

  const [activeSection, setActiveSection] =
    useState('hero')

  const [showNav, setShowNav] =
    useState(false)

  const navItems = [

    {
      id: 'story',
      label: 'Story',
      icon: '✨'
    },

    {
      id: 'bride',
      label: 'Bride',
      icon: '👰'
    },

    {
      id: 'groom',
      label: 'Groom',
      icon: '🤵'
    },

    {
      id: 'events',
      label: 'Events',
      icon: '📅'
    },

    {
      id: 'gallery',
      label: 'Gallery',
      icon: '🖼'
    },

    {
      id: 'videos',
      label: 'Videos',
      icon: '🎥'
    },

    {
      id: 'liveMemories',
      label: 'Live',
      icon: '📸'
    },

    {
      id: 'saveTheDate',
      label: 'Save',
      icon: '❤️'
    }
  ]

  useEffect(() => {

    const observer =
      new IntersectionObserver(

        (entries) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              setActiveSection(
                entry.target.id
              )

            }

          })

        },

        {

          threshold: 0.2

        }

      )

    navItems.forEach(item => {

      const element =
        document.getElementById(
          item.id
        )

      if (element)
        observer.observe(element)

    })



    return () => observer.disconnect()

  }, [])

  useEffect(() => {

    function handleScroll() {
  
      if (window.scrollY > 250) {
  
        setShowNav(true)
  
      } else {
  
        setShowNav(false)
  
      }
  
    }
  
    window.addEventListener(
      'scroll',
      handleScroll
    )
  
    return () => {
  
      window.removeEventListener(
        'scroll',
        handleScroll
      )
  
    }
  
  }, [])

  function scrollToSection(id) {

    document
      .getElementById(id)
      ?.scrollIntoView({

        behavior: 'smooth'

      })

  }

  return (

    <motion.div

      initial={{
        opacity: 0,
        x: 100
      }}

      animate={{

        opacity:
          showNav ? 1 : 0,
  
        x:
          showNav ? 0 : 100
  
      }}
  
      transition={{
        duration: 0.5
      }}

      className="fixed right-6 inset-y-0 z-[9999] hidden lg:flex flex-col justify-center gap-4"

    >

      {navItems.map(item => {

        const active =
          activeSection === item.id

        return (

          <motion.button

            key={item.id}

            whileHover={{
              scale: 1.08
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={() =>
              scrollToSection(item.id)
            }

            className={`

                group
                flex
                items-center
                gap-4
                rounded-full
                backdrop-blur-xl
                border
                shadow-2xl
                transition-all
                duration-500
                overflow-hidden
                px-5 
                py-4
              
                ${active
              
                  ? 'px-5 py-4 scale-110'
              
                  : 'px-5 py-4 scale-80 opacity-80'
              
                }
              
              `}

            style={{

              background: active

                ? currentTheme.colors.secondary

                : 'rgba(255,255,255,0.35)',

              color: active

                ? '#ffffff'

                : currentTheme.colors.primary,

              borderColor:
                currentTheme.colors.soft

            }}


          >

            {/* ICON */}

            <span className="text-2xl">

              {item.icon}

            </span>

            {/* LABEL */}

            <span className="font-semibold text-lg whitespace-nowrap">

              {item.label}

            </span>

            {/* ACTIVE GLOW */}

            {active && (

              <motion.div

                layoutId="nav-glow"

                className="absolute inset-0 rounded-full opacity-20 blur-xl"

                style={{
                  background:
                    currentTheme.colors.accent
                }}

              />

            )}

          </motion.button>

        )

      })}

    </motion.div>

  )

}

export default FloatingNavigation