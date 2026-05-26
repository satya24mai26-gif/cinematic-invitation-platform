import {

    useState
  
  } from 'react'
  
  import {
  
    useLocation,
  
    useNavigate
  
  } from 'react-router-dom'

  import {

    useAuth
  
  }
  from '../context/AuthContext'
  
  function VerifyLoginOTPPage() {
  
    const [otp, setOtp] =
      useState('')
  
    const [loading, setLoading] =
      useState(false)
  
    const location =
      useLocation()
  
    const navigate =
      useNavigate()
  
    const email =
      location.state?.email

    const {

        refreshUser,
      
        user
      
      } = useAuth()
  
    async function handleVerify() {
  
      try {
  
        setLoading(true)
  
        const response =
          await fetch(
  
            'http://localhost:5000/api/auth/verify-login-otp',
  
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
  
        const result = await response.json();

        if (result.success) {
          await refreshUser();

          const meResponse = await fetch(
            "http://localhost:5000/api/auth/me",

            {
              credentials: "include",
            }
          );

          const meResult = await meResponse.json();

          if (meResult.data.role === "admin") {
            navigate("/developer");
          } else {
            navigate("/");
          }
        } else {
          alert(result.message);
        }
  
      } catch (error) {
  
        console.log(error)
  
      } finally {
  
        setLoading(false)
  
      }
  
    }

    async function resendOTP() {

        try {
      
          const response =
            await fetch(
      
              'http://localhost:5000/api/auth/resend-login-otp',
      
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
      <div>
        <h1>Verify Login OTP</h1>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />

        <button onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button onClick={resendOTP}>Resend OTP</button>
      </div>
    );
  
  }
  
  export default
  VerifyLoginOTPPage