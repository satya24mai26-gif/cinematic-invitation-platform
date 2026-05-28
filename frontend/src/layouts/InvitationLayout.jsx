import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useInvitation } from '../context/InvitationContext'
import { getInvitation } from '../services/invitationService'

function InvitationLayout() {

    const { slug } =
    useParams()
  
    const { setData } =
    useInvitation()
  
    useEffect(() => {
  
      async function loadInvitation() {
  
        const invitation =
          await getInvitation(slug)
  
        setData(invitation)
  
      }
  
      loadInvitation()
  
    }, [setData, slug])
  
    return <Outlet />
  
  }

export default InvitationLayout
