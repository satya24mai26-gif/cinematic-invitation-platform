import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import getTheme from '../utils/getTheme'
import { getAllInvitations } from "../services/invitationService";
import { useAuth }
from '../context/AuthContext'
import { API_URL }
from '../config'

function HomePage() {
  const navigate = useNavigate()
  const {

    user,
  
    logout
  
  } = useAuth()
  const currentTheme = getTheme("traditional")
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {

    async function loadInvitations() {
  
      try {
  
        /*
        ONLY AFTER USER LOGIN
        */
  
        if (!user) return
  
        /*
        ADMIN
        */
  
        if (
  
          user.role === 'admin'
  
        ) {
  
          const response =
            await getAllInvitations()
  
          setInvitations(response)
  
          return
  
        }
  
        /*
        NORMAL USER
        */
  
        const response =
          await fetch(
  
            `${API_URL}/api/invitations/my`,
  
            {
  
              credentials: 'include'
  
            }
  
          )
  
        const result =
          await response.json()
  
        if (
  
          result.success
  
        ) {
  
          setInvitations([
  
            result.data
  
          ])
  
        }
  
      } catch (error) {
  
        console.log(error)
  
      }
  
    }
  
    loadInvitations()
  
  }, [user])

  function vs(){
    if (!user) {

      navigate('/login')
    
      return
    
    }
    
    if (
    
      user.role === 'admin'
    
    ) {
    
      navigate('/developer')
    
      return
    
    }
    
    navigate('/dashboard')
  }

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        background: currentTheme.background,
        color: currentTheme.colors.primary,
      }}
    >
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md/20 border-b border-yellow-700/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
          {/* Logo */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
              Divine Invite
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-yellow-100">
            <a href="#" className="hover:text-yellow-400 transition">
              Home
            </a>

            <a href="#" className="hover:text-yellow-400 transition">
              Templates
            </a>

            <a href="#" className="hover:text-yellow-400 transition">
              Themes
            </a>

            <a href="#" className="hover:text-yellow-400 transition">
              Features
            </a>
          </nav>

          {/* CTA Button */}
          {

user

?

(

  <div className="flex items-center gap-4">

    <button

      onClick={() => {

        const invitation =
          invitations.find(

            item =>

              item._id ===
              user.invitation

          )

        if (invitation) {

          navigate(

            `/${invitation.slug}/builder`

          )

        }

      }}

      className="
      bg-yellow-500
      hover:bg-yellow-400
      text-black
      px-6
      py-3
      rounded-full
      font-bold
      transition
    "

    >

      Dashboard

    </button>

    <button

      onClick={logout}

      className="
      border
      border-yellow-500
      text-yellow-400
      px-6
      py-3
      rounded-full
      font-bold
    "

    >

      Logout

    </button>

  </div>

)

:

(

  <div className="flex items-center gap-4">

    <button

      onClick={() =>
        navigate('/login')
      }

      className="
      border
      border-yellow-500
      text-yellow-400
      px-6
      py-3
      rounded-full
      font-bold
    "

    >

      Login

    </button>

    <button

      onClick={() =>
        navigate('/register')
      }

      className="
      bg-yellow-500
      hover:bg-yellow-400
      text-black
      px-6
      py-3
      rounded-full
      font-bold
      transition
    "

    >

      Register

    </button>

  </div>

)

}
        </div>
      </header>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3b1d08] via-[#140b05] to-black opacity-90"></div>

      {/* Floating Light Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-red-500/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700"></div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-yellow-400 tracking-[6px] uppercase text-sm md:text-lg"
        >
          Traditional Cinematic Invitation Platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4 }}
          className="mt-6 text-5xl md:text-8xl font-bold leading-tight"
        >
          Create Beautiful
          <br />
          Wedding Invitations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-lg md:text-2xl text-yellow-100 max-w-3xl"
        >
          Design cinematic wedding invitations with divine themes, animations,
          events, music, galleries, videos, and unforgettable storytelling
          experiences.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => vs()}
          className="mt-12 bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-full text-xl font-bold shadow-2xl"
        >
          Create Invitation
        </motion.button>
      </div>

      {/* YOUR INVITATIONS */}

      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-400">
            Your Invitations
          </h2>

          <p className="mt-6 text-yellow-100 text-lg md:text-xl">
            Manage and edit your cinematic invitations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {invitations.map((invitation) => (
            <div
              key={invitation._id}
              className="
              rounded-[35px]
              border
              border-yellow-700
              bg-gradient-to-b
              from-yellow-900/30
              to-black
              p-8
              shadow-2xl
            "
            >
              <h3 className="text-3xl font-bold text-yellow-400">
                {invitation.title}
              </h3>

              <p className="mt-4 text-yellow-100">{invitation.slug}</p>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => navigate(`/${invitation.slug}/builder`)}
                  className="
                  bg-yellow-500
                  text-black
                  px-5
                  py-3
                  rounded-full
                  font-bold
                "
                >
                  Edit
                </button>

                <button
                  onClick={() => navigate(`/${invitation.slug}`)}
                  className="
                  border
                  border-yellow-500
                  text-yellow-400
                  px-5
                  py-3
                  rounded-full
                  font-bold
                "
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Invitation Samples */}

      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-400">
            Mobile Invitation Samples
          </h2>

          <p className="mt-6 text-yellow-100 text-lg md:text-xl">
            Explore beautifully crafted cinematic wedding invitation
            experiences.
          </p>
        </div>

        {/* Cards Container */}

        <div className="flex gap-10 overflow-x-auto scrollbar-hide pb-6">
          {/* Card 1 */}
          <div className="min-w-[260px] h-[520px] rounded-[40px] bg-gradient-to-b from-yellow-900 to-black border-4 border-yellow-600 shadow-2xl flex flex-col items-center justify-center p-6 hover:scale-105 transition duration-500">
            <div className="text-yellow-400 text-sm tracking-[4px] uppercase">
              Ganesh Theme
            </div>

            <h3 className="mt-8 text-3xl text-center font-bold">
              Satya ❤ Vasavi
            </h3>

            <p className="mt-6 text-yellow-100 text-center">
              Traditional Telugu Wedding Invitation
            </p>

            <button className="mt-10 bg-yellow-500 text-black px-6 py-3 rounded-full font-bold">
              Preview
            </button>
          </div>

          {/* Card 2 */}
          <div className="min-w-[260px] h-[520px] rounded-[40px] bg-gradient-to-b from-red-900 to-black border-4 border-red-600 shadow-2xl flex flex-col items-center justify-center p-6 hover:scale-105 transition duration-500">
            <div className="text-red-300 text-sm tracking-[4px] uppercase">
              Krishna Theme
            </div>

            <h3 className="mt-8 text-3xl text-center font-bold">
              Rahul ❤ Sneha
            </h3>

            <p className="mt-6 text-red-100 text-center">
              Divine Cinematic Experience
            </p>

            <button className="mt-10 bg-red-500 text-black px-6 py-3 rounded-full font-bold">
              Preview
            </button>
          </div>

          {/* Card 3 */}
          <div className="min-w-[260px] h-[520px] rounded-[40px] bg-gradient-to-b from-orange-900 to-black border-4 border-orange-600 shadow-2xl flex flex-col items-center justify-center p-6 hover:scale-105 transition duration-500">
            <div className="text-orange-300 text-sm tracking-[4px] uppercase">
              Royal Theme
            </div>

            <h3 className="mt-8 text-3xl text-center font-bold">
              Arjun ❤ Kavya
            </h3>

            <p className="mt-6 text-orange-100 text-center">
              Premium Wedding Storytelling
            </p>

            <button className="mt-10 bg-orange-500 text-black px-6 py-3 rounded-full font-bold">
              Preview
            </button>
          </div>
        </div>
      </section>

      {/* Desktop Invitation Samples */}

      <section className="relative z-10 py-28 px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-400">
            Desktop Invitation Experiences
          </h2>

          <p className="mt-6 text-yellow-100 text-lg md:text-xl">
            Explore immersive cinematic invitation layouts crafted for
            unforgettable wedding storytelling.
          </p>
        </div>

        <div className="space-y-16">
          {/* Sample 1 */}

          <div className="relative overflow-hidden rounded-[40px] border border-yellow-700 bg-gradient-to-r from-[#2b1306] to-black p-10 shadow-2xl hover:scale-[1.01] transition duration-500">
            <div className="absolute inset-0 bg-yellow-500/5"></div>

            <div className="relative z-10">
              <div className="text-yellow-400 tracking-[5px] uppercase text-sm">
                Ganesh Cinematic Theme
              </div>

              <h3 className="mt-6 text-5xl md:text-7xl font-bold">
                Satya ❤ Vasavi
              </h3>

              <p className="mt-8 text-yellow-100 text-xl max-w-3xl">
                A divine Telugu wedding invitation experience featuring
                cinematic storytelling, animations, traditional visuals,
                galleries, music, and sacred themes.
              </p>

              <button className="mt-10 bg-yellow-500 text-black px-8 py-4 rounded-full font-bold">
                View Experience
              </button>
            </div>
          </div>

          {/* Sample 2 */}

          <div className="relative overflow-hidden rounded-[40px] border border-red-700 bg-gradient-to-r from-[#240707] to-black p-10 shadow-2xl hover:scale-[1.01] transition duration-500">
            <div className="absolute inset-0 bg-red-500/5"></div>

            <div className="relative z-10">
              <div className="text-red-300 tracking-[5px] uppercase text-sm">
                Krishna Wedding Theme
              </div>

              <h3 className="mt-6 text-5xl md:text-7xl font-bold">
                Rahul ❤ Sneha
              </h3>

              <p className="mt-8 text-red-100 text-xl max-w-3xl">
                A luxurious cinematic invitation featuring divine glow effects,
                cultural storytelling, side selection experiences, and emotional
                presentation.
              </p>

              <button className="mt-10 bg-red-500 text-black px-8 py-4 rounded-full font-bold">
                View Experience
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* God Theme Showcase */}

      <section className="relative z-10 py-28 px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-400">
            Divine Theme Collection
          </h2>

          <p className="mt-6 text-yellow-100 text-lg md:text-xl max-w-4xl mx-auto">
            Select from beautifully crafted divine wedding themes inspired by
            sacred traditions, cinematic storytelling, temple aesthetics, and
            cultural elegance.
          </p>
        </div>

        {/* Theme Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Ganesh Theme */}

          <div className="rounded-[35px] overflow-hidden border border-yellow-700 bg-gradient-to-b from-yellow-900/40 to-black p-8 hover:scale-105 transition duration-500 shadow-2xl">
            <div className="h-52 rounded-3xl bg-gradient-to-b from-yellow-500/30 to-black flex items-center justify-center text-6xl">
              🕉
            </div>

            <h3 className="mt-8 text-3xl font-bold text-yellow-400">
              Ganesha Theme
            </h3>

            <p className="mt-4 text-yellow-100">
              Sacred beginnings with divine glow, temple ambiance, and
              traditional cinematic presentation.
            </p>
          </div>

          {/* Krishna Theme */}

          <div className="rounded-[35px] overflow-hidden border border-blue-700 bg-gradient-to-b from-blue-900/40 to-black p-8 hover:scale-105 transition duration-500 shadow-2xl">
            <div className="h-52 rounded-3xl bg-gradient-to-b from-blue-500/30 to-black flex items-center justify-center text-6xl">
              🪈
            </div>

            <h3 className="mt-8 text-3xl font-bold text-blue-300">
              Krishna Theme
            </h3>

            <p className="mt-4 text-blue-100">
              Elegant flute-inspired cinematic invitations with emotional
              storytelling and divine visuals.
            </p>
          </div>

          {/* Vishnu Theme */}

          <div className="rounded-[35px] overflow-hidden border border-cyan-700 bg-gradient-to-b from-cyan-900/40 to-black p-8 hover:scale-105 transition duration-500 shadow-2xl">
            <div className="h-52 rounded-3xl bg-gradient-to-b from-cyan-500/30 to-black flex items-center justify-center text-6xl">
              ✨
            </div>

            <h3 className="mt-8 text-3xl font-bold text-cyan-300">
              Vishnu Theme
            </h3>

            <p className="mt-4 text-cyan-100">
              Grand royal invitation experiences with sacred animations and
              cinematic elegance.
            </p>
          </div>

          {/* Temple Theme */}

          <div className="rounded-[35px] overflow-hidden border border-red-700 bg-gradient-to-b from-red-900/40 to-black p-8 hover:scale-105 transition duration-500 shadow-2xl">
            <div className="h-52 rounded-3xl bg-gradient-to-b from-red-500/30 to-black flex items-center justify-center text-6xl">
              🛕
            </div>

            <h3 className="mt-8 text-3xl font-bold text-red-300">
              Temple Theme
            </h3>

            <p className="mt-4 text-red-100">
              Traditional South Indian wedding atmosphere with sacred
              temple-inspired design language.
            </p>
          </div>
        </div>
      </section>

      {/* Invitation Types */}

      <section className="relative z-10 py-28 px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-400">
            Invitation Experiences
          </h2>

          <p className="mt-6 text-yellow-100 text-lg md:text-xl max-w-4xl mx-auto">
            Create cinematic invitation experiences for every special
            celebration with divine themes, storytelling animations, and
            unforgettable presentation.
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Wedding */}

          <div className="rounded-[35px] border border-yellow-700 bg-gradient-to-b from-yellow-900/40 to-black p-10 shadow-2xl hover:scale-105 transition duration-500">
            <div className="text-6xl">💍</div>

            <h3 className="mt-8 text-3xl font-bold text-yellow-400">Wedding</h3>

            <p className="mt-5 text-yellow-100">
              Cinematic wedding invitations with themes, events, galleries,
              music, and storytelling.
            </p>
          </div>

          {/* Engagement */}

          <div
            className="rounded-[35px] border bg-white p-10 shadow-2xl hover:scale-105 transition duration-500"
            style={{
              borderColor: currentTheme.colors.primary,
            }}
          >
            <div className="text-6xl">💖</div>

            <h3 className="mt-8 text-3xl font-bold ">Engagement</h3>

            <p
              className="mt-5"
              style={{
                color: currentTheme.colors.secondary,
              }}
            >
              Elegant engagement invitations with romantic cinematic animations
              and previews.
            </p>
          </div>

          {/* Birthday */}

          <div className="rounded-[35px] border border-blue-700 bg-gradient-to-b from-blue-900/40 to-black p-10 shadow-2xl hover:scale-105 transition duration-500">
            <div className="text-6xl">🎂</div>

            <h3 className="mt-8 text-3xl font-bold text-blue-300">Birthday</h3>

            <p className="mt-5 text-blue-100">
              Fun cinematic birthday invitation experiences with custom themes
              and celebrations.
            </p>
          </div>

          {/* Housewarming */}

          <div className="rounded-[35px] border border-green-700 bg-gradient-to-b from-green-900/40 to-black p-10 shadow-2xl hover:scale-105 transition duration-500">
            <div className="text-6xl">🏡</div>

            <h3 className="mt-8 text-3xl font-bold text-green-300">
              Housewarming
            </h3>

            <p className="mt-5 text-green-100">
              Traditional housewarming invitation experiences inspired by sacred
              cultural celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features */}

      <section className="relative z-10 py-28 px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-400">
            Platform Features
          </h2>

          <p className="mt-6 text-yellow-100 text-lg md:text-xl max-w-4xl mx-auto">
            Experience a new generation of cinematic invitation technology
            designed for unforgettable storytelling and traditional celebration
            experiences.
          </p>
        </div>

        {/* Features Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}

          <div className="rounded-[35px] border border-yellow-700 bg-gradient-to-b from-yellow-900/30 to-black p-10 shadow-2xl">
            <div className="text-5xl">🎬</div>

            <h3 className="mt-8 text-3xl font-bold text-yellow-400">
              Cinematic Storytelling
            </h3>

            <p className="mt-5 text-yellow-100">
              Create immersive wedding invitation experiences with cinematic
              intros, emotional transitions, and storytelling animations.
            </p>
          </div>

          {/* Feature 2 */}

          <div className="rounded-[35px] border border-red-700 bg-gradient-to-b from-red-900/30 to-black p-10 shadow-2xl">
            <div className="text-5xl">🛕</div>

            <h3 className="mt-8 text-3xl font-bold text-red-300">
              Divine Theme Engine
            </h3>

            <p className="mt-5 text-red-100">
              Choose sacred themes inspired by Ganesha, Krishna, temple
              aesthetics, floral traditions, and cultural elegance.
            </p>
          </div>

          {/* Feature 3 */}

          <div className="rounded-[35px] border border-blue-700 bg-gradient-to-b from-blue-900/30 to-black p-10 shadow-2xl">
            <div className="text-5xl">📸</div>

            <h3 className="mt-8 text-3xl font-bold text-blue-300">
              Smart Media Galleries
            </h3>

            <p className="mt-5 text-blue-100">
              Display cinematic galleries with automatic transitions, dynamic
              image queues, videos, and visual storytelling.
            </p>
          </div>

          {/* Feature 4 */}

          <div className="rounded-[35px] border border-green-700 bg-gradient-to-b from-green-900/30 to-black p-10 shadow-2xl">
            <div className="text-5xl">📍</div>

            <h3 className="mt-8 text-3xl font-bold text-green-300">
              Event & Maps System
            </h3>

            <p className="mt-5 text-green-100">
              Add ceremonies, event schedules, venues, and direct map navigation
              for guests and family members.
            </p>
          </div>

          {/* Feature 5 */}

          <div
            className="rounded-[35px] border bg-gradient-to-b from-pink-900/30 to-black p-10 shadow-2xl style={{
  borderColor: currentTheme.colors.primary
}}"
          >
            <div className="text-5xl">💞</div>

            <h3 className="mt-8 text-3xl font-bold text-pink-300">
              Bride & Groom Experiences
            </h3>

            <p
              className="mt-5"
              style={{
                color: currentTheme.colors.secondary,
              }}
            >
              Create separate cinematic invitation experiences for bride side
              and groom side with custom themes and styling.
            </p>
          </div>

          {/* Feature 6 */}

          <div className="rounded-[35px] border border-cyan-700 bg-gradient-to-b from-cyan-900/30 to-black p-10 shadow-2xl">
            <div className="text-5xl">🔒</div>

            <h3 className="mt-8 text-3xl font-bold text-cyan-300">
              Secure Invitations
            </h3>

            <p className="mt-5 text-cyan-100">
              Share secure token-based invitation links with expiry controls,
              privacy options, and protected access.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}

      <section className="relative z-10 py-28 px-6 md:px-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-400">
            How It Works
          </h2>

          <p className="mt-6 text-yellow-100 text-lg md:text-xl max-w-4xl mx-auto">
            Create and share immersive cinematic invitation experiences in just
            a few simple steps.
          </p>
        </div>

        {/* Steps */}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Step 1 */}

          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-yellow-500 text-black flex items-center justify-center text-4xl font-bold shadow-2xl">
              1
            </div>

            <h3 className="mt-8 text-2xl font-bold text-yellow-400">
              Select Theme
            </h3>

            <p className="mt-4 text-yellow-100">
              Choose divine cinematic themes inspired by sacred traditions and
              modern storytelling.
            </p>
          </div>

          {/* Step 2 */}

          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-500 text-black flex items-center justify-center text-4xl font-bold shadow-2xl">
              2
            </div>

            <h3 className="mt-8 text-2xl font-bold text-red-300">
              Add Details
            </h3>

            <p className="mt-4 text-red-100">
              Enter couple details, dates, family names, events, and invitation
              information.
            </p>
          </div>

          {/* Step 3 */}

          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-500 text-black flex items-center justify-center text-4xl font-bold shadow-2xl">
              3
            </div>

            <h3 className="mt-8 text-2xl font-bold text-blue-300">
              Upload Media
            </h3>

            <p className="mt-4 text-blue-100">
              Add photos, cinematic videos, galleries, music, and memorable
              wedding moments.
            </p>
          </div>

          {/* Step 4 */}

          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-green-500 text-black flex items-center justify-center text-4xl font-bold shadow-2xl">
              4
            </div>

            <h3 className="mt-8 text-2xl font-bold text-green-300">
              Generate Invite
            </h3>

            <p className="mt-4 text-green-100">
              Create secure cinematic invitations with storytelling animations
              and themes.
            </p>
          </div>

          {/* Step 5 */}

          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-pink-500 text-black flex items-center justify-center text-4xl font-bold shadow-2xl">
              5
            </div>

            <h3 className="mt-8 text-2xl font-bold ">Share Experience</h3>

            <p
              className="mt-4"
              style={{
                color: currentTheme.colors.secondary,
              }}
            >
              Share unforgettable cinematic wedding experiences with friends and
              family.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}

      <section className="relative z-10 py-28 px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-400">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-yellow-100 text-lg md:text-xl max-w-4xl mx-auto">
            Everything you need to know about cinematic invitation experiences,
            themes, media, and sharing.
          </p>
        </div>

        {/* FAQ Items */}

        <div className="max-w-5xl mx-auto space-y-8">
          {/* FAQ 1 */}

          <div className="rounded-[30px] border border-yellow-700 bg-gradient-to-b from-yellow-900/20 to-black p-8">
            <h3 className="text-2xl font-bold text-yellow-400">
              Can I customize invitation themes?
            </h3>

            <p className="mt-4 text-yellow-100 text-lg">
              Yes. You can select divine cinematic themes, traditional styles,
              colors, animations, galleries, and invitation experiences.
            </p>
          </div>

          {/* FAQ 2 */}

          <div className="rounded-[30px] border border-red-700 bg-gradient-to-b from-red-900/20 to-black p-8">
            <h3 className="text-2xl font-bold text-red-300">
              Can I add wedding videos and galleries?
            </h3>

            <p className="mt-4 text-red-100 text-lg">
              Yes. You can add cinematic videos, image galleries, event photos,
              pre-wedding shoots, and memorable moments.
            </p>
          </div>

          {/* FAQ 3 */}

          <div className="rounded-[30px] border border-blue-700 bg-gradient-to-b from-blue-900/20 to-black p-8">
            <h3 className="text-2xl font-bold text-blue-300">
              Are invitation links secure?
            </h3>

            <p className="mt-4 text-blue-100 text-lg">
              Invitations are generated using secure token-based links with
              optional expiry and privacy controls.
            </p>
          </div>

          {/* FAQ 4 */}

          <div className="rounded-[30px] border border-green-700 bg-gradient-to-b from-green-900/20 to-black p-8">
            <h3 className="text-2xl font-bold text-green-300">
              Can I create separate bride and groom experiences?
            </h3>

            <p className="mt-4 text-green-100 text-lg">
              Yes. The platform supports bride-side and groom-side cinematic
              invitation experiences with separate themes and styling.
            </p>
          </div>

          {/* FAQ 5 */}

          <div
            className="rounded-[30px] border bg-gradient-to-b from-pink-900/20 to-black p-8"
            style={{
              borderColor: currentTheme.colors.primary,
            }}
          >
            <h3 className="text-2xl font-bold text-pink-300">
              Can invitations expire automatically?
            </h3>

            <p
              className="mt-4 text-lg"
              style={{
                color: currentTheme.colors.secondary,
              }}
            >
              Yes. Invitation owners can configure expiry dates and later extend
              access if needed.
            </p>
          </div>
        </div>

        {/* Final CTA Section */}

        <section className="relative z-10 py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto rounded-[50px] overflow-hidden border border-yellow-700 bg-gradient-to-r from-[#3b1d08] via-[#140b05] to-black shadow-2xl">
            <div className="px-10 md:px-20 py-24 text-center relative overflow-hidden">
              {/* Glow Effects */}

              <div className="absolute w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>

              <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

              {/* Content */}

              <div className="relative z-10">
                <p className="text-yellow-400 tracking-[6px] uppercase text-sm md:text-lg">
                  Begin Your Wedding Story
                </p>

                <h2 className="mt-8 text-5xl md:text-7xl font-bold leading-tight">
                  Create Your
                  <br />
                  Cinematic Invitation
                </h2>

                <p className="mt-8 text-yellow-100 text-lg md:text-2xl max-w-4xl mx-auto">
                  Design unforgettable cinematic wedding experiences with divine
                  themes, emotional storytelling, elegant animations, galleries,
                  events, music, and sacred celebration moments.
                </p>

                <button
                  onClick={() => vs()}
                  className="mt-12 bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition hover:scale-105"
                >
                  Start Creating
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}

      <footer
        className="relative z-10 border-t border-yellow-700/30 backdrop-blur-md"
        style={{
          background: currentTheme.background,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
            {/* Brand */}

            <div>
              <h2 className="text-4xl font-bold text-yellow-400">
                Divine Invite
              </h2>

              <p className="mt-6 text-yellow-100 leading-8">
                Create unforgettable cinematic wedding invitation experiences
                with divine themes, storytelling animations, and traditional
                elegance.
              </p>
            </div>

            {/* Quick Links */}

            <div>
              <h3 className="text-2xl font-bold text-yellow-400">
                Quick Links
              </h3>

              <div className="mt-6 space-y-4 text-yellow-100">
                <p className="hover:text-yellow-400 cursor-pointer transition">
                  Home
                </p>

                <p className="hover:text-yellow-400 cursor-pointer transition">
                  Templates
                </p>

                <p className="hover:text-yellow-400 cursor-pointer transition">
                  Themes
                </p>

                <p className="hover:text-yellow-400 cursor-pointer transition">
                  Features
                </p>
              </div>
            </div>

            {/* Invitation Types */}

            <div>
              <h3 className="text-2xl font-bold text-yellow-400">
                Invitation Types
              </h3>

              <div className="mt-6 space-y-4 text-yellow-100">
                <p>Wedding Invitations</p>
                <p>Engagement Invitations</p>
                <p>Birthday Invitations</p>
                <p>Housewarming Invitations</p>
              </div>
            </div>

            {/* Contact */}

            <div>
              <h3 className="text-2xl font-bold text-yellow-400">Contact</h3>

              <div className="mt-6 space-y-4 text-yellow-100">
                <p>Email: support@divineinvite.com</p>

                <p>Instagram: @divineinvite</p>

                <p>Website: divineinvite.com</p>
              </div>
            </div>
          </div>

          {/* Bottom Line */}

          <div className="mt-20 border-t border-yellow-700/20 pt-8 text-center text-yellow-100">
            © 2026 Divine Invite. Crafted with tradition, storytelling, and
            cinematic elegance.
          </div>
        </div>
      </footer>

      {/* Bottom Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-yellow-900/30 to-transparent"></div>
    </div>
  );
}

export default HomePage