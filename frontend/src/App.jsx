import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import DonorDashboard from './components/DonorDashboard'
import HospitalDashboard from './components/HospitalDashboard'
import RequirementDashboard from './components/RequirementDashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="/dashboard/donor" replace />} />
            <Route path="donor" element={<DonorDashboard />} />
            <Route path="requirement" element={<RequirementDashboard />} />
            <Route path="hospital" element={<HospitalDashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
