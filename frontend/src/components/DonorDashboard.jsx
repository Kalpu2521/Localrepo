import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../lib/api'

export default function DonorDashboard() {
  const { user } = useAuth()
  const [donorProfile, setDonorProfile] = useState(null)
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      // Fetch donor profile
      try {
        const { data: donorData } = await api.get('/api/donors/me')
        setDonorProfile(donorData)
      } catch (err) {
        if (err.response?.status !== 404) {
          setError('Failed to load donor profile')
        }
      }

      // Fetch hospitals
      const { data: hospitalsData } = await api.get('/api/hospitals')
      setHospitals(hospitalsData.slice(0, 10)) // Limit to 10
    } catch (err) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="card">
        <h2 className="title">Donor Profile</h2>
        {donorProfile ? (
          <div className="mt-4 space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {donorProfile.user?.name || user?.name}
            </p>
            <p>
              <span className="font-semibold">Blood Group:</span> {donorProfile.bloodGroup}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {donorProfile.location || 'Not specified'}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {donorProfile.phone || 'Not provided'}
            </p>
            <p>
              <span className="font-semibold">Last Donation:</span>{' '}
              {donorProfile.lastDonationDate 
                ? new Date(donorProfile.lastDonationDate).toLocaleDateString()
                : 'Never'}
            </p>
            <p>
              <span className="font-semibold">Availability:</span>{' '}
              <span className={donorProfile.availability ? 'text-green-600' : 'text-red-600'}>
                {donorProfile.availability ? 'Available' : 'Not Available'}
              </span>
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-gray-600 mb-4">You haven't created your donor profile yet.</p>
            <a href="/register" className="btn-primary">Create Donor Profile</a>
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="title">Nearby Hospitals</h2>
          <button onClick={fetchData} className="btn-secondary text-sm">
            Refresh
          </button>
        </div>
        {hospitals.length > 0 ? (
          <ul className="mt-3 grid md:grid-cols-2 gap-3">
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
        ) : (
          <p className="text-gray-600">No hospitals found.</p>
        )}
      </div>
    </div>
  )
}
