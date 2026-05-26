import InvitationHero from '../components/invitation/InvitationHero'

import StorySection from '../components/invitation/CoupleStorySection'

import BrideSection from '../components/invitation/BrideSection'

import GroomSection from '../components/invitation/GroomSection'

import FamilySection from '../components/invitation/FamilySection'

import EventsSection from '../components/invitation/EventsSection'

import GallerySection from '../components/invitation/GallerySection'

import VideoSection from '../components/invitation/VideoSection'

import SaveTheDateSection from '../components/invitation/SaveTheDateSection'

import LiveMemoriesSection from '../components/invitation/LiveMemoriesSection'

const sectionRegistry = {

  hero: InvitationHero,

  story: StorySection,

  bride: BrideSection,

  groom: GroomSection,

  family: FamilySection,

  events: EventsSection,

  gallery: GallerySection,

  videos: VideoSection,

  liveMemories: LiveMemoriesSection,

  saveTheDate: SaveTheDateSection

}

export default sectionRegistry