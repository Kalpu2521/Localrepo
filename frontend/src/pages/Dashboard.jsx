import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <div className="text-center">Loading...</div>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Determine which tabs to show based on user role
  const showDonor = user.role === 'donor' || user.role === 'admin'
  const showRecipient = user.role === 'recipient' || user.role === 'admin'
  const showHospital = user.role === 'hospital' || user.role === 'admin'

  // Default route based on role
  const defaultRoute = user.role === 'donor' ? '/dashboard/donor' 
    : user.role === 'recipient' ? '/dashboard/requirement'
    : user.role === 'hospital' ? '/dashboard/hospital'
    : '/dashboard/donor'

  return (
    <main className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-600">
          Welcome, <span className="font-semibold">{user.name}</span> ({user.role})
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        {showDonor && (
          <NavLink to="/dashboard/donor" className={({isActive})=>`tab ${isActive?'active':''}`}>
            Donor
          </NavLink>
        )}
        {showRecipient && (
          <NavLink to="/dashboard/requirement" className={({isActive})=>`tab ${isActive?'active':''}`}>
            Requirement
          </NavLink>
        )}
        {showHospital && (
          <NavLink to="/dashboard/hospital" className={({isActive})=>`tab ${isActive?'active':''}`}>
            Hospital
          </NavLink>
        )}
      </div>
      <Outlet />
    </main>
  )
}

