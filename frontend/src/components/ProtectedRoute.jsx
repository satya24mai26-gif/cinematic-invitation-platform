import {

    Navigate
  
  } from 'react-router-dom'
  
  import {
  
    useAuth
  
  } from '../context/AuthContext'
  
  function ProtectedRoute({
  
    children
  
  }) {
  
    const {
  
      user,
  
      loading
  
    } = useAuth()
  
    /*
    LOADING
    */
  
    if (loading) {
  
      return (
  
        <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
  
          Loading...
  
        </div>
  
      )
  
    }
  
    /*
    NOT LOGGED IN
    */
  
    if (!user) {
  
      return <Navigate to="/login" />
  
    }
  
    /*
    AUTHORIZED
    */
  
    return children
  
  }
  
  export default ProtectedRoute