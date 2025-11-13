import { useState } from 'react'
import DonorForm from '../components/DonorForm'
import HospitalForm from '../components/HospitalForm'
import RequirementForm from '../components/RequirementForm'
import api, { setAuthToken } from '../lib/api'

export default function Register() {
  const [tab, setTab] = useState('donor')

  async function onSubmit(data) {
    if (tab === 'donor') {
      // 1) create user
      const { data: reg } = await api.post('/api/auth/register', {
        name: data.fullName,
        email: data.email || `${Date.now()}@placeholder.local`,
        password: Math.random().toString(36).slice(2) + '!A1',
        role: 'donor'
      })
      setAuthToken(reg.token)
      // 2) create donor profile
      await api.post('/api/donors', {
        bloodGroup: data.bloodGroup,
        lastDonationDate: data.lastDonationDate || data.lastDonation || undefined,
        availability: data.willing === 'Yes',
        location: [data.address, data.city, data.state].filter(Boolean).join(', '),
        phone: data.mobile
      })
      alert('Donor registered successfully')
      return
    }
    if (tab === 'hospital') {
      const { data: reg } = await api.post('/api/auth/register', {
        name: data.name,
        email: data.email || `${Date.now()}@placeholder.local`,
        password: Math.random().toString(36).slice(2) + '!A1',
        role: 'hospital'
      })
      setAuthToken(reg.token)
      await api.post('/api/hospitals', {
        name: data.name,
        address: data.address,
        phone: data.mobile,
        email: data.email
      })
      alert('Hospital/NGO registered successfully')
      return
    }
    if (tab === 'requirement') {
      const { data: reg } = await api.post('/api/auth/register', {
        name: data.patientName,
        email: data.email || `${Date.now()}@placeholder.local`,
        password: Math.random().toString(36).slice(2) + '!A1',
        role: 'recipient'
      })
      setAuthToken(reg.token)
      await api.post('/api/recipients', {
        requiredBloodGroup: data.bloodGroup,
        urgency: 'high',
        notes: `${data.quantity} units at ${data.place}. Contact ${data.contact}/${data.mobile}`
      })
      alert('Requirement posted successfully')
      return
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={()=>setTab('donor')} className={`tab ${tab==='donor'?'active':''}`}>Donor Registration</button>
        <button onClick={()=>setTab('hospital')} className={`tab ${tab==='hospital'?'active':''}`}>Hospital / NGO Registration</button>
        <button onClick={()=>setTab('requirement')} className={`tab ${tab==='requirement'?'active':''}`}>Requirement Registration</button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {tab==='donor' && <DonorForm onSubmit={onSubmit} />}
        {tab==='hospital' && <HospitalForm onSubmit={onSubmit} />}
        {tab==='requirement' && <RequirementForm onSubmit={onSubmit} />}
      </div>
    </main>
  )
}

