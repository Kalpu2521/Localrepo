export default function HospitalDashboard() {
  const requests = [
    { patient: 'Ravi Kumar', group: 'A+', contact: '9876543210' },
    { patient: 'Meera Singh', group: 'O-', contact: '9123456780' }
  ]
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="title">Hospital Details</h2>
        <p>Name: City Hospital • License: CH/BB/2025</p>
        <p>Facilities: 24x7, Apheresis, Ambulance</p>
      </div>
      <div className="card">
        <h2 className="title mb-3">Current Blood Requests</h2>
        <ul className="space-y-2">
          {requests.map((r, idx) => (
            <li key={idx} className="p-4 rounded border border-gray-200 flex items-center justify-between">
              <div>
                <div className="font-medium">{r.patient}</div>
                <div className="text-sm text-gray-500">Blood Group: {r.group}</div>
              </div>
              <div className="text-sm">Contact: {r.contact}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

