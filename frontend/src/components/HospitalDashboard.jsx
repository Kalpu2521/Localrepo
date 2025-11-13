import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../lib/api'

export default function HospitalDashboard() {
  const { user } = useAuth()
  const [hospitalProfile, setHospitalProfile] = useState(null)
  const [recipients, setRecipients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      // Fetch hospital profile
      try {
        const { data: hospitalData } = await api.get('/api/hospitals/me')
        setHospitalProfile(hospitalData)
      } catch (err) {
        if (err.response?.status !== 404) {
          setError('Failed to load hospital profile')
        }
      }

      // Fetch recipients/requests
      const { data: recipientsData } = await api.get('/api/recipients')
      setRecipients(recipientsData.slice(0, 20)) // Limit to 20
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
        <h2 className="title">Hospital Details</h2>
        {hospitalProfile ? (
          <div className="mt-4 space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {hospitalProfile.name}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {hospitalProfile.address || 'Not specified'}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {hospitalProfile.phone || 'Not provided'}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {hospitalProfile.email || 'Not provided'}
            </p>
            {hospitalProfile.bloodStock && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Blood Stock:</p>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  {Object.entries(hospitalProfile.bloodStock).map(([group, count]) => (
                    <div key={group} className="p-2 bg-gray-50 rounded">
                      <span className="font-medium">{group}:</span> {count}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-gray-600 mb-4">You haven't created your hospital profile yet.</p>
            <a href="/register" className="btn-primary">Create Hospital Profile</a>
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="title">Current Blood Requests</h2>
          <button onClick={fetchData} className="btn-secondary text-sm">
            Refresh
          </button>
        </div>
        {recipients.length > 0 ? (
          <ul className="space-y-2">
            {recipients.map((recipient) => (
              <li key={recipient._id} className="p-4 rounded border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {recipient.user?.name || 'Unknown Patient'}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Blood Group: <span className="font-semibold">{recipient.requiredBloodGroup}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Urgency: <span className={`font-semibold ${
                        recipient.urgency === 'high' ? 'text-red-600' :
                        recipient.urgency === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {recipient.urgency?.toUpperCase() || 'LOW'}
                      </span>
                    </div>
                    {recipient.notes && (
                      <div className="text-sm text-gray-600 mt-1">{recipient.notes}</div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No blood requests found.</p>
        )}
      </div>
    </div>
  )
}
