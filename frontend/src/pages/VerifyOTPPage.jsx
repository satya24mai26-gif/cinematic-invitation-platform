import { useState }
from 'react'

import {

  useLocation,

  useNavigate

} from 'react-router-dom'

import { useAuth }
from '../context/AuthContext'

import { API_URL } from '../config'


function VerifyOTPPage() {


  const location =
    useLocation()

  const navigate =
    useNavigate()

    const {

      verifyOTP,
    
      refreshUser
    
    } = useAuth()

  const email =
    location.state?.email || ''

    console.log(email)

  const [otp, setOTP] =
    useState('')

  const [loading, setLoading] =
    useState(false)

    

  async function handleVerify(

    e

  ) {

    e.preventDefault()

    try {

      setLoading(true)

      const result =
        await verifyOTP(

          email,

          otp

        )

        if (result.success) {

          await refreshUser()
        
          const meResponse =
            await fetch(
        
              `${API_URL}/api/auth/me`,
        
              {
        
                credentials: 'include'
        
              }
        
            )
        
          const meResult =
            await meResponse.json()
        
          if (
        
            meResult.data.role === 'admin'
        
          ) {
        
            navigate('/developer')
        
          } else {
        
            navigate('/')
        
          }
        
        } else {

        alert(result.message)

      }

    } catch (error) {

      console.log(error)

      alert(
        'OTP verification failed'
      )

    } finally {

      setLoading(false)

    }

  }

  async function resendOTP() {

    try {
  
      const response =
        await fetch(
  
          `${API_URL}/api/auth/resend-otp`,
  
          {
  
            method: 'POST',
  
            headers: {
  
              'Content-Type':
                'application/json'
  
            },
  
            body: JSON.stringify({
  
              email
  
            })
  
          }
  
        )
  
      const result =
        await response.json()
  
      alert(result.message)
  
    } catch (error) {
  
      console.log(error)
  
    }
  
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-black px-6">

      <form

        onSubmit={handleVerify}

        className="w-full max-w-md bg-zinc-900 rounded-[40px] p-10 shadow-2xl"

      >

        <h1 className="text-4xl font-bold text-yellow-400 text-center">

          Verify OTP

        </h1>

        <p className="mt-4 text-zinc-400 text-center">

          OTP sent to:

        </p>

        <p className="text-center text-white mt-2">

          {email}

        </p>

        <div className="mt-10 space-y-6">

          <input

            type="text"

            placeholder="Enter OTP"

            value={otp}

            onChange={(e) =>
              setOTP(e.target.value)
            }

            className="w-full px-6 py-4 rounded-2xl bg-zinc-800 text-white outline-none text-center text-2xl tracking-[10px]"

          />

          <button

            type="submit"

            disabled={loading}

            className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-bold"

          >

            {

              loading

              ?

              'Verifying...'

              :

              'Verify OTP'

            }

          </button>

          <button

  onClick={resendOTP}

>

  Resend OTP

</button>

        </div>

      </form>

    </div>

  )

}

export default VerifyOTPPage
