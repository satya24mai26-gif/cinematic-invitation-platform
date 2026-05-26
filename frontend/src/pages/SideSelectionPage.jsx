import themeConfig from '../data/themeConfig'

function SideSelectionPage() {
  const currentTheme = themeConfig.appTheme
  return (
    <div className='min-h-screen flex items-center justify-center'
    style={{
      background: currentTheme.background,
      color: currentTheme.colors.primary
    }}
    >
      <h1 className='text-5xl'>
        Select Side
      </h1>
    </div>
  )
}

export default SideSelectionPage