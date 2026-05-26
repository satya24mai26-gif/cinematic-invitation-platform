import { createContext, useContext, useState } from 'react'

import invitationData from '../data/invitationData'

const InvitationContext = createContext()

export function InvitationProvider({ children }) {

  const [data, setData] = useState(invitationData)
  const [selectedSide, setSelectedSide] = useState('bride')

  return (

    <InvitationContext.Provider
      value={{
        data,
        setData,

        selectedSide,
        setSelectedSide
      }}
    >
      {children}
    </InvitationContext.Provider>

  )

}

export function useInvitation() {

  return useContext(InvitationContext)

}