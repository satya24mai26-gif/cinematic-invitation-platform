import BuilderPage from './BuilderPage'
import themeConfig from '../data/themeConfig'
import InvitationPage from './InvitationPage'

function BuilderPreviewPage() {
 
  const currentTheme = themeConfig.appTheme
  return (

    <div className="h-screen overflow-hidden flex">

      {/* LEFT PANEL */}

      <div className="w-[420px] overflow-y-auto border-r border-orange-100"
      style={{
        background : currentTheme.background
      }}
      >

        <BuilderPage />

      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 overflow-y-auto bg-white">

        <InvitationPage />

      </div>

    </div>

  )
}

export default BuilderPreviewPage