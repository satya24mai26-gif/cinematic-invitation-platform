import axios from 'axios'



const API =
  'http://localhost:5000/api/invitations'



export async function getInvitation(
  slug
) {

  const response =
    await axios.get(

      `${API}/${slug}`,

      {
    
        withCredentials: true
    
      }


    )

  return response.data.data

}

export async function updateInvitation(

    slug,
  
    data
  
  ) {
  
    const response =
      await axios.put(
  
        `${API}/${slug}`,
  
        data,

        {
      
          withCredentials: true
      
        }
  
      )
  
    return response.data.data
  
  }

  export async function


getAllInvitations() {

  const response =
    await axios.get(

      `${API}`,

      {
    
        withCredentials: true
    
      }

    )

  return response.data.data

}

export async function
createInvitation(data) {

  const response =
    await axios.post(

      `${API}`,

      data,

      {
    
        withCredentials: true
    
      }

    )

  return response.data.data

}