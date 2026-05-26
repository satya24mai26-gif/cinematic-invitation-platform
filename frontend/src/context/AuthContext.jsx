import {

    createContext,
  
    useContext,
  
    useEffect,
  
    useState
  
  } from 'react'

import { API_URL } from '../config'
  
  const AuthContext =
    createContext()
  
  function AuthProvider({
  
    children
  
  }) {
  
    const [user, setUser] =
      useState(null)
  
    const [loading, setLoading] =
      useState(true)
  
    /*
    LOAD CURRENT USER
    */
  
    useEffect(() => {
  
      async function loadUser() {
  
        try {
  
          const response =
            await fetch(
  
              `${API_URL}/api/auth/me`,
  
              {
  
                credentials: 'include'
  
              }
  
            )
  
          const result =
            await response.json()
  
          if (result.success) {
  
            setUser(result.data)
  
          }
  
        } catch (error) {
  
          console.log(error)
  
        } finally {
  
          setLoading(false)
  
        }
  
      }
  
      loadUser()
  
    }, [])
  
    /*
    LOGIN
    */
  
    async function login(
  
      email,
  
      password
  
    ) {
  
      const response =
        await fetch(
  
          'http://localhost:5000/api/auth/login',
  
          {
  
            method: 'POST',
  
            headers: {
  
              'Content-Type':
                'application/json'
  
            },
  
            credentials: 'include',
  
            body: JSON.stringify({
  
              email,
  
              password
  
            })
  
          }
  
        )
  
        const result =
        await response.json()
      
        if (

          result.success &&
        
          !result.otpRequired
        
        ) {
        
          await refreshUser()
        
        }
      
      return result;
  
    }
  
    /*
    REGISTER
    */
  
    async function register(
  
      email,
  
      password
  
    ) {
  
      const response =
        await fetch(
  
          'http://localhost:5000/api/auth/register',
  
          {
  
            method: 'POST',
  
            headers: {
  
              'Content-Type':
                'application/json'
  
            },
  
            body: JSON.stringify({
  
              email,
  
              password
  
            })
  
          }
  
        )
  
      return await response.json()
  
    }
  
    /*
    VERIFY OTP
    */
  
    async function verifyOTP(
  
      email,
  
      otp
  
    ) {
  
      const response =
        await fetch(
  
          'http://localhost:5000/api/auth/verify-otp',
  
          {
  
            method: 'POST',
  
            headers: {
  
              'Content-Type':
                'application/json'
  
            },
  
            credentials: 'include',
  
            body: JSON.stringify({
  
              email,
  
              otp
  
            })
  
          }
  
        )
  
      const result =
        await response.json()
  
      if (result.success) {
  
        await refreshUser()
  
      }
  
      return result
  
    }
  
    /*
    REFRESH USER
    */
  
    async function refreshUser() {
  
      try {
  
        const response =
          await fetch(
  
            `${API_URL}/api/auth/me`,
  
            {
  
              credentials: 'include'
  
            }
  
          )
  
        const result =
          await response.json()
  
        if (result.success) {
  
          setUser(result.data)
  
        }
  
      } catch (error) {
  
        console.log(error)
  
      }
  
    }
  
    /*
    LOGOUT
    */
  
    async function logout() {
  
      await fetch(
  
        'http://localhost:5000/api/auth/logout',
  
        {
  
          method: 'POST',
  
          credentials: 'include'
  
        }
  
      )
  
      setUser(null)
  
    }
  
    return (
  
      <AuthContext.Provider
  
        value={{
  
          user,
  
          setUser,
  
          loading,
  
          login,
  
          register,
  
          verifyOTP,
  
          logout,
  
          refreshUser
  
        }}
  
      >
  
        {children}
  
      </AuthContext.Provider>
  
    )
  
  }
  
  export function useAuth() {
  
    return useContext(AuthContext)
  
  }
  
  export default AuthProvider
