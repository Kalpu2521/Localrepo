import { NavLink, Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <main className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="flex gap-3 mb-6">
        <NavLink to="/dashboard/donor" className={({isActive})=>`tab ${isActive?'active':''}`}>Donor</NavLink>
        <NavLink to="/dashboard/requirement" className={({isActive})=>`tab ${isActive?'active':''}`}>Requirement</NavLink>
        <NavLink to="/dashboard/hospital" className={({isActive})=>`tab ${isActive?'active':''}`}>Hospital</NavLink>
      </div>
      <Outlet />
    </main>
  )
}

