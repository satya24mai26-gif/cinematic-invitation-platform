import {

    useEffect,
  
    useState
  
  } from 'react'
  
  import axios
  from 'axios'
  
  import {
  
    useNavigate
  
  } from 'react-router-dom'
  
  function DeveloperPage() {
  
    const navigate =
      useNavigate()
  
    const [invitations, setInvitations] =
      useState([])
  
    const [loading, setLoading] =
      useState(true)
  
    async function loadInvitations() {
  
      try {
  
        const response =
          await axios.get(
  
            'http://localhost:5000/api/invitations',
  
            {
  
              withCredentials: true
  
            }
  
          )
  
        setInvitations(
  
          response.data.data || []
  
        )
  
      } catch (error) {
  
        console.log(error)
  
      } finally {
  
        setLoading(false)
  
      }
  
    }
  
    useEffect(() => {
  
      loadInvitations()
  
    }, [])
  
    async function deleteInvitation(
  
      slug
  
    ) {
  
      const confirmed =
        window.confirm(
  
          'Delete invitation?'
  
        )
  
      if (!confirmed) return
  
      try {
  
        await axios.delete(
  
          `http://localhost:5000/api/invitations/${slug}`,
  
          {
  
            withCredentials: true
  
          }
  
        )
  
        loadInvitations()
  
      } catch (error) {
  
        console.log(error)
  
        alert('Delete failed')
  
      }
  
    }
  
    if (loading) {
  
      return (
  
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
  
          Loading...
  
        </div>
  
      )
  
    }
  
    return (
  
      <div className="min-h-screen bg-black text-white p-10">
  
        <div className="flex items-center justify-between">
  
          <h1 className="text-5xl font-bold text-yellow-400">
  
            Developer Panel
  
          </h1>
  
        </div>
  
        <div className="mt-10 overflow-x-auto">
  
          <table className="w-full border border-zinc-800">
  
            <thead>
  
              <tr className="bg-zinc-900">
  
                <th className="p-4 text-left">
  
                  Slug
  
                </th>
  
                <th className="p-4 text-left">
  
                  Title
  
                </th>
  
                <th className="p-4 text-left">
  
                  Owner
  
                </th>
  
                <th className="p-4 text-left">
  
                  Actions
  
                </th>
  
              </tr>
  
            </thead>
  
            <tbody>
  
              {
  
                invitations.map(
  
                  invitation => (
  
                    <tr
  
                      key={invitation._id}
  
                      className="
                      border-t
                      border-zinc-800
                    "
  
                    >
  
                      <td className="p-4">
  
                        {
  
                          invitation.slug
  
                        }
  
                      </td>
  
                      <td className="p-4">
  
                        {
  
                          invitation.title
  
                        }
  
                      </td>
  
                      <td className="p-4">
  
                        {
  
                          invitation.owner
  
                          ?
  
                          invitation.owner
  
                          :
  
                          'No Owner'
  
                        }
  
                      </td>
  
                      <td className="p-4 flex gap-4">
  
                        <button
  
                          onClick={() =>
  
                            navigate(
  
                              `/${invitation.slug}/builder`
  
                            )
  
                          }
  
                          className="
                          px-4
                          py-2
                          bg-yellow-500
                          text-black
                          rounded-xl
                        "
  
                        >
  
                          Edit
  
                        </button>
  
                        <button
  
                          onClick={() =>
  
                            window.open(
  
                              `/${invitation.slug}`,
  
                              '_blank'
  
                            )
  
                          }
  
                          className="
                          px-4
                          py-2
                          bg-blue-500
                          rounded-xl
                        "
  
                        >
  
                          Preview
  
                        </button>
  
                        <button
  
                          onClick={() =>
  
                            deleteInvitation(
  
                              invitation.slug
  
                            )
  
                          }
  
                          className="
                          px-4
                          py-2
                          bg-red-500
                          rounded-xl
                        "
  
                        >
  
                          Delete
  
                        </button>
  
                      </td>
  
                    </tr>
  
                  )
  
                )
  
              }
  
            </tbody>
  
          </table>
  
        </div>
  
      </div>
  
    )
  
  }
  
  export default DeveloperPage