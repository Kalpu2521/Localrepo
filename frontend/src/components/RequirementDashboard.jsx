import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../lib/api'

export default function RequirementDashboard() {
  const { user } = useAuth()
  const [recipientProfile, setRecipientProfile] = useState(null)
  const [hospitals, setHospitals] = useState([])
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      // Fetch recipient profile
      try {
        const { data: recipientData } = await api.get('/api/recipients/me')
        setRecipientProfile(recipientData)
      } catch (err) {
        if (err.response?.status !== 404) {
          setError('Failed to load recipient profile')
        }
      }

      // Fetch hospitals
      const { data: hospitalsData } = await api.get('/api/hospitals')
      setHospitals(hospitalsData.slice(0, 10))

      // Fetch donors if we have a blood group requirement
      if (recipientProfile?.requiredBloodGroup) {
        const { data: donorsData } = await api.get('/api/donors')
        // Filter donors by matching blood group or compatible groups
        const compatibleDonors = donorsData.filter(donor => 
          donor.bloodGroup === recipientProfile.requiredBloodGroup || 
          (donor.availability && isCompatibleBloodGroup(donor.bloodGroup, recipientProfile.requiredBloodGroup))
        )
        setDonors(compatibleDonors.slice(0, 10))
      } else {
        const { data: donorsData } = await api.get('/api/donors')
        setDonors(donorsData.filter(d => d.availability).slice(0, 10))
      }
    } catch (err) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  // Simple blood group compatibility check
  function isCompatibleBloodGroup(donorGroup, requiredGroup) {
    // O- can donate to everyone
    if (donorGroup === 'O-') return true
    // O+ can donate to all positive groups
    if (donorGroup === 'O+' && requiredGroup.includes('+')) return true
    // Same group
    if (donorGroup === requiredGroup) return true
    // AB+ can receive from everyone (but we're checking donors, so reverse logic)
    // For simplicity, we'll just check exact match and O- compatibility
    return false
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  const hasHospitals = hospitals.length > 0
  const hasDonors = donors.length > 0

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="card">
        <h2 className="title">Requirement Details</h2>
        {recipientProfile ? (
          <div className="mt-4 space-y-2">
            <p>
              <span className="font-semibold">Patient:</span> {recipientProfile.user?.name || user?.name}
            </p>
            <p>
              <span className="font-semibold">Blood Group Required:</span>{' '}
              <span className="font-bold text-red-600">{recipientProfile.requiredBloodGroup}</span>
            </p>
            <p>
              <span className="font-semibold">Urgency:</span>{' '}
              <span className={`font-semibold ${
                recipientProfile.urgency === 'high' ? 'text-red-600' :
                recipientProfile.urgency === 'medium' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {recipientProfile.urgency?.toUpperCase() || 'LOW'}
              </span>
            </p>
            {recipientProfile.notes && (
              <p>
                <span className="font-semibold">Notes:</span> {recipientProfile.notes}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-gray-600 mb-4">You haven't created your requirement profile yet.</p>
            <a href="/register" className="btn-primary">Create Requirement Profile</a>
          </div>
        )}
      </div>

      {hasHospitals && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="title">Available Hospitals</h2>
            <button onClick={fetchData} className="btn-secondary text-sm">
              Refresh
            </button>
          </div>
          <ul className="space-y-2">
            {hospitals.map((hospital) => (
              <li key={hospital._id} className="p-4 rounded border border-gray-200">
                <div className="font-medium">{hospital.name}</div>
                <div className="text-sm text-gray-500 mt-1">{hospital.address || 'Address not provided'}</div>
                {hospital.phone && (
                  <div className="text-sm text-gray-600 mt-1">Phone: {hospital.phone}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasDonors && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="title">Available Donors</h2>
            <button onClick={fetchData} className="btn-secondary text-sm">
              Refresh
            </button>
          </div>
          <ul className="space-y-2">
            {donors.map((donor) => (
              <li key={donor._id} className="p-4 rounded border border-gray-200">
                <div className="font-medium">{donor.user?.name || 'Anonymous Donor'}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Blood Group: <span className="font-semibold">{donor.bloodGroup}</span>
                </div>
                {donor.location && (
                  <div className="text-sm text-gray-600 mt-1">Location: {donor.location}</div>
                )}
                {donor.phone && (
                  <div className="text-sm text-gray-600 mt-1">Phone: {donor.phone}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!hasHospitals && !hasDonors && recipientProfile && (
        <div className="card">
          <p className="text-gray-600">No hospitals or donors found at the moment.</p>
        </div>
      )}
    </div>
  )
}
