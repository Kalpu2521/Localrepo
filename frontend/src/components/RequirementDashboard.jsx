export default function RequirementDashboard() {
  const hospitals = [
    { name: 'Metro Care', city: 'Mumbai', contact: '022-555-1234' }
  ]
  const donors = [
    { name: 'Anil Sharma', location: 'Andheri', contact: '9000000001' }
  ]
  const available = hospitals.length > 0
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="title">Requirement Details</h2>
        <p>Patient: Mehul • Blood: B+ • City: Mumbai</p>
      </div>
      <div className="card">
        <h2 className="title mb-3">{available ? 'Available Hospitals' : 'Individual Donor Info'}</h2>
        <ul className="space-y-2">
          {(available ? hospitals : donors).map((x, idx) => (
            <li key={idx} className="p-4 rounded border border-gray-200 flex items-center justify-between">
              <div>
                <div className="font-medium">{x.name}</div>
                <div className="text-sm text-gray-500">{available ? x.city : x.location}</div>
              </div>
              <div className="text-sm">{x.contact}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

