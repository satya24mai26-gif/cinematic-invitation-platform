import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

function VerifyLoginOTPPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your email'; // Smart fallback if text reference is missing

  const { refreshUser } = useAuth();

  async function handleVerify() {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/auth/verify-login-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, otp })
      });

      const result = await response.json();

      if (result.success) {
        await refreshUser();

        const meResponse = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

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
      console.log(error);
    } // Safe termination block
    finally {
      setLoading(false);
    }
  }

  async function resendOTP() {
    try {
      const response = await fetch(`${API_URL}/api/auth/resend-login-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 selection:bg-yellow-500 selection:text-black font-sans bg-slate-950">
      
      {/* Decorative Top Border Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 z-50"></div>

      {/* Floating Light Ambient Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-[450px] h-[450px] bg-yellow-500/5 rounded-full blur-3xl -top-40 -left-20 animate-pulse"></div>
        <div className="absolute w-[450px] h-[450px] bg-amber-600/5 rounded-full blur-3xl -bottom-40 -right-20 animate-pulse"></div>
      </div>

      {/* VERIFICATION CONTAINER CARD */}
      <div className="relative z-10 w-full max-w-md rounded-[32px] border border-slate-900 bg-slate-900/30 backdrop-blur-xl shadow-2xl p-8 md:p-10 text-center">
        
        {/* Cinematic Symbol Badge */}
        <div className="w-14 h-14 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex items-center justify-center text-xl mx-auto mb-6 shadow-lg shadow-yellow-500/5">
          🔐
        </div>

        {/* Header Block Elements */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Verify Security Pass
        </h1>
        
        <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
          We sent a secure validation passcode to <span className="text-yellow-400/90 font-medium font-mono break-all">{email}</span>.
        </p>

        {/* Input Interactive Element Wrapper */}
        <div className="mt-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="••••••"
              className="w-full tracking-[12px] placeholder:tracking-normal text-center h-14 rounded-xl bg-slate-950/60 border border-slate-900 focus:border-yellow-500/40 text-yellow-400 text-xl font-bold font-mono shadow-inner outline-none transition-all"
            />
          </div>

          {/* Core Access Trigger Verification CTA Button */}
          <button 
            onClick={handleVerify} 
            disabled={loading || !otp}
            className="w-full h-12 mt-2 rounded-xl text-sm font-bold bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 disabled:opacity-40 disabled:pointer-events-none text-slate-950 transition-all shadow-md shadow-yellow-500/5 tracking-wide"
          >
            {loading ? "Decrypting Token..." : "Confirm Access"}
          </button>
        </div>

        {/* Resend Auxiliary Link Row Footer */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-500 font-medium">Didn't receive the credentials?</p>
          <button 
            onClick={resendOTP}
            className="text-yellow-400/80 hover:text-yellow-400 font-bold transition-colors underline underline-offset-4 decoration-yellow-500/20"
          >
            Resend Passcode
          </button>
        </div>

      </div>
    </div>
  );
}

export default VerifyLoginOTPPage;