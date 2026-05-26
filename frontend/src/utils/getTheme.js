import invitationData from '../data/invitationData'

import themeConfig from '../data/themeConfig'

function getTheme(selectedSide) {

  const themeKey =
    selectedSide === 'bride'
      ? invitationData.theme.brideSideTheme
      : invitationData.theme.groomSideTheme

  return themeConfig[themeKey]

}

export default getTheme