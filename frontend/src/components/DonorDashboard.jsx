export default function DonorDashboard() {
  const hospitals = [
    { name: 'City Hospital', city: 'Delhi', distance: '2.3 km' },
    { name: 'Metro Care', city: 'Delhi', distance: '5.1 km' }
  ]
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="title">Donor Profile</h2>
        <p>Name: John Doe • Blood Group: O+</p>
        <p>City: Delhi • Last Donation: 2024-10-10</p>
      </div>
      <div className="card">
        <div className="flex items-center justify-between">
          <h2 className="title">Nearby Hospitals</h2>
          <button className="btn-secondary">Find Nearby Hospitals</button>
        </div>
        <ul className="mt-3 grid md:grid-cols-2 gap-3">
          {hospitals.map(h => (
            <li key={h.name} className="p-4 rounded border border-gray-200 flex items-center justify-between">
              <div>
                <div className="font-medium">{h.name}</div>
                <div className="text-sm text-gray-500">{h.city}</div>
              </div>
              <div className="text-sm text-gray-600">{h.distance}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

