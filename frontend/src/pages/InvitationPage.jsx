import { motion } from 'framer-motion'
import getTheme from '../utils/getTheme'
import sectionRegistry from '../data/sectionRegistry'
import { useInvitation } from '../context/InvitationContext'
import { useParams, useSearchParams } from "react-router-dom";

import { useEffect } from "react";

import { getInvitation } from "../services/invitationService";



function InvitationPage() {
  const { slug } =
  useParams()

  const [searchParams] = useSearchParams()


  const { data, setData } = useInvitation();

  let {selectedSide} = useInvitation();

  selectedSide = searchParams.get('side') ?? selectedSide

  const currentTheme = getTheme(selectedSide)

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
  
  }, [setData, slug])

  let dynamicSectionOrder =
  data?.sectionOrder || []

  if (

    dynamicSectionOrder.length === 0
  
  ) {
  
    dynamicSectionOrder = []
  
    /*
    HERO
    */
  
    if (
  
      data?.landingPage
  
    ) {
  
      dynamicSectionOrder.push(
  
        'hero'
  
      )
  
    }
  
    /*
    COUPLE
    */
  
    if (
  
      data?.couple?.groom?.name ||
  
      data?.couple?.bride?.name
  
    ) {
  
      dynamicSectionOrder.push(
  
        'couple'
  
      )
  
    }
  
    /*
    EVENTS
    */
  
    if (
  
      data?.events?.length > 0
  
    ) {
  
      dynamicSectionOrder.push(
  
        'events'
  
      )
  
    }
  
    /*
    GALLERY
    */
  
    if (
  
      data?.gallery?.length > 0
  
    ) {
  
      dynamicSectionOrder.push(
  
        'gallery'
  
      )
  
    }
  
  }

  if (data?.published === false) {

    return (

      <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center px-6 text-center">

        <div>

          <p className="text-sm uppercase tracking-[5px] text-orange-600">
            Private Draft
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-orange-950">
            This invitation is not published yet.
          </h1>

        </div>

      </div>

    )

  }

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        color: currentTheme.colors.primary,
      }}
    >
      {
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className={`min-h-screen relative overflow-hidden ${
            selectedSide === "groom"
              ? "bg-gradient-to-b from-yellow-950 via-pink to-green"
              : "bg-gradient-to-b from-green via-white to-yellow"
          }`}
        >
         

          {dynamicSectionOrder.map((sectionKey) => {
            const SectionComponent = sectionRegistry[sectionKey];

            if (!SectionComponent) return null;

            if (!data?.sections?.[sectionKey]) return null;

            return (
              <SectionComponent key={sectionKey} selectedSide={selectedSide} />
            );
          })}
        </motion.div>
      }
    </div>
  );
}

export default InvitationPage;
