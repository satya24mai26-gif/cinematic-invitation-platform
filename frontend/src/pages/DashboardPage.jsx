import {

    useEffect,
  
    useState
  
  } from 'react'
  
  import axios
  from 'axios'
  
  import {
  
    useNavigate
  
  } from 'react-router-dom'
  
  import {
  
    useAuth
  
  } from '../context/AuthContext'

  import { API_URL }

from '../config'
  
  function DashboardPage() {
  
    const navigate =
      useNavigate()
  
    const {
  
      user,
  
      logout
  
    } = useAuth()
  
    const [invitation, setInvitation] =
      useState(null)
  
    const [loading, setLoading] =
      useState(true)
  
    useEffect(() => {
  
      async function loadInvitation() {
  
        try {
  
          if (!user?.invitation) {
  
            setLoading(false)
  
            return
  
          }
  
          const response =
            await axios.get(
  
              `${API_URL}/api/invitations/my`,
  
              {
  
                withCredentials: true
  
              }
  
            )

            setInvitation(response.data.data)
  
        } catch (error) {
  
          console.log(error)
  
        } finally {
  
          setLoading(false)
  
        }
  
      }
  
      loadInvitation()
  
    }, [user])
  
    async function
    createNewInvitation() {
    
      try {
    
        /*
        LOGIN REQUIRED
        */
    
        if (!user) {
    
          navigate('/login')
    
          return
    
        }
    
        /*
        ADMIN
        */
    
        if (
    
          user.role === 'admin'
    
        ) {
    
          navigate('/developer')
    
          return
    
        }
    
        /*
        CREATE INVITATION
        */
    
        const response =
          await axios.post(
    
            `${API_URL}/api/invitations`,
    
            {},
    
            {
    
              withCredentials: true
    
            }
    
          )
    
        const invitation =
          response.data.data
    
        /*
        OPEN BUILDER
        */
    
        navigate(
    
          `/${invitation.slug}/builder`
    
        )
    
      } catch (error) {
    
        console.log(error)
    
        alert(
    
          'Failed to create invitation'
    
        )
    
      }
    
    }
    async function copyInvitationLink() {

      if (!invitation?.slug) return

      const shareUrl =
        `${window.location.origin}/${invitation.slug}`

      try {

        await navigator.clipboard.writeText(shareUrl)

        alert('Invitation link copied')

      } catch {

        window.prompt(
          'Copy invitation link',
          shareUrl
        )

      }

    }

    if (loading) {

      return (

        <div className="min-h-screen bg-black text-white flex items-center justify-center">

          Loading dashboard...

        </div>

      )

    }

    return (
  
      <div className="min-h-screen bg-black text-white p-10">
  
        <div className="flex items-center justify-between">
  
          <h1 className="text-5xl font-bold text-yellow-400">
  
            Dashboard
  
          </h1>
  
          <div className="flex gap-4">
  
            {
  
              user?.role === 'admin'
  
              &&
  
              (
  
                <button
  
                  onClick={() =>
  
                    navigate('/developer')
  
                  }
  
                  className="
                  px-6
                  py-3
                  bg-purple-600
                  rounded-2xl
                "
  
                >
  
                  Developer Panel
  
                </button>
  
              )
  
            }
  
            <button
  
              onClick={logout}
  
              className="
              px-6
              py-3
              bg-red-500
              rounded-2xl
            "
  
            >
  
              Logout
  
            </button>
  
          </div>
  
        </div>
  
        {
  
          invitation
  
          ?
  
          (
  
            <div className="mt-12 bg-zinc-900 rounded-3xl p-8">
  
              <h2 className="text-3xl font-bold">
  
                {
  
                  invitation.title ||
  
                  'My Invitation'
  
                }
  
              </h2>
  
              <div className="mt-6 flex gap-4">
  
                <button
  
                  onClick={() =>
  
                    navigate(
  
                      `/${invitation.slug}/builder`
  
                    )
  
                  }
  
                  className="
                  px-6
                  py-3
                  bg-yellow-500
                  text-black
                  rounded-2xl
                  font-bold
                "
  
                >
  
                  Open Builder
  
                </button>
  
                <button
  
                  onClick={() =>
  
                    window.open(
  
                      `/${invitation.slug}`,
  
                      '_blank'
  
                    )
  
                  }
  
                  className="
                  px-6
                  py-3
                  bg-blue-500
                  rounded-2xl
                "
  
                >
  
                  Preview
  
                </button>

                <button
  
                  onClick={copyInvitationLink}
  
                  className="
                  px-6
                  py-3
                  bg-green-600
                  rounded-2xl
                "
  
                >
  
                  Copy Link
  
                </button>

                <span className={`
                  px-4
                  py-3
                  rounded-2xl
                  text-sm
                  font-bold
                  ${invitation.published === false ? 'bg-zinc-700 text-zinc-200' : 'bg-green-900 text-green-200'}
                `}>
                  {invitation.published === false ? 'Draft' : 'Published'}
                </span>
  
              </div>
  
            </div>
  
          )
  
          :
  
          (
  
            <div className="mt-12 bg-zinc-900 rounded-3xl p-8">
  
              <h2 className="text-3xl font-bold">
  
                No Invitation Yet
  
              </h2>
  
              <button
  
                onClick={createNewInvitation}
  
                className="
                mt-6
                px-8
                py-4
                bg-yellow-500
                text-black
                rounded-2xl
                font-bold
              "
  
              >
  
                Create Invitation
  
              </button>
  
            </div>
  
          )
  
        }
  
      </div>
  
    )
  
  }
  
  export default DashboardPage
