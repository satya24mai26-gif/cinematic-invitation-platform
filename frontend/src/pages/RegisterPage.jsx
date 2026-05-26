import { useState } from 'react'

import { useNavigate }
from 'react-router-dom'

import { useAuth }
from '../context/AuthContext'

function RegisterPage() {

  const navigate =
    useNavigate()

  const { register } =
    useAuth()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  async function handleRegister(

    e

  ) {

    e.preventDefault()

    try {

      setLoading(true)

      const result =
        await register(

          email,

          password

        )

      if (result.success) {

        if (result.developer) {

            navigate('/login')
        
            return
        
          }

        navigate(

          '/verify-otp',

          {

            state: {

              email

            }

          }

        )

      } else {

        alert(result.message)

      }

    } catch (error) {

      console.log(error)

      alert(
        'Registration failed'
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-black px-6">

      <form

        onSubmit={handleRegister}

        className="w-full max-w-md bg-zinc-900 rounded-[40px] p-10 shadow-2xl"

      >

        <h1 className="text-4xl font-bold text-yellow-400 text-center">

          Register

        </h1>

        <div className="mt-10 space-y-6">

          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="w-full px-6 py-4 rounded-2xl bg-zinc-800 text-white outline-none"

          />

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            className="w-full px-6 py-4 rounded-2xl bg-zinc-800 text-white outline-none"

          />

          <button

            type="submit"

            disabled={loading}

            className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-bold"

          >

            {

              loading

              ?

              'Creating Account...'

              :

              'Register'

            }

          </button>

        </div>

      </form>

    </div>

  )

}

export default RegisterPage