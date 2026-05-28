import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import BuilderPage from './pages/BuilderPage'
import InvitationPage from './pages/InvitationPage'
import BuilderPreviewPage from './pages/BuilderPreviewPage'
import LandingPage from './pages/LandingPage'
import DivineIntro from './pages/DivineIntro'
import RegisterPage
from './pages/RegisterPage'

import LoginPage
from './pages/LoginPage'

import VerifyOTPPage
from './pages/VerifyOTPPage'

import ProtectedRoute
from './components/ProtectedRoute'

import DeveloperPage
from './pages/DeveloperPage'

import AdminRoute
from './components/AdminRoute'

import DashboardPage from './pages/DashboardPage'

import VerifyLoginOTPPage from './pages/VerifyLoginOTPPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/verify-otp" element={<VerifyOTPPage />} />

        <Route path="/verify-login-otp" element={<VerifyLoginOTPPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/:slug/builder"
          element={
            <ProtectedRoute>
              <BuilderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/developer"
          element={
            <AdminRoute>
              <DeveloperPage />
            </AdminRoute>
          }
        />

        <Route
          path="/:slug/builder-preview"
          element={
            <AdminRoute>
              <BuilderPreviewPage />
            </AdminRoute>
          }
        />
        <Route path="/:slug" element={<LandingPage />} />
        <Route path="/:slug/divine-intro" element={<DivineIntro />} />
        <Route path="/:slug/invitation" element={<InvitationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App