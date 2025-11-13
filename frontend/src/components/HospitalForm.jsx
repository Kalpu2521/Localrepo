import { useForm } from 'react-hook-form'

const facilities = ["Blood Storage", "Apheresis", "24x7", "Ambulance"]

export default function HospitalForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input placeholder="Organization / Hospital / NGO Name" className="input" {...register('name', { required: 'Required' })} />
        <input placeholder="Registration Number" className="input" {...register('regNo', { required: 'Required' })} />
        <select className="input" {...register('type', { required: 'Required' })}>
          <option value="">Type</option>
          <option>Govt</option>
          <option>Private</option>
          <option>Charitable</option>
        </select>
        <input placeholder="Blood Bank License Number" className="input" {...register('license', { required: 'Required' })} />
        <input placeholder="Contact Person Name" className="input" {...register('contactName', { required: 'Required' })} />
        <input placeholder="Designation" className="input" {...register('designation')} />
        <input placeholder="Mobile" className="input" {...register('mobile', { required: 'Required' })} />
        <input placeholder="Email" className="input" {...register('email')} />
        <input placeholder="Working Hours" className="input md:col-span-2" {...register('hours')} />
        <textarea placeholder="Address (Full)" className="input md:col-span-2" rows={3} {...register('address', { required: 'Required' })} />
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Available Facilities</label>
          <div className="flex flex-wrap gap-3">
            {facilities.map(f => (
              <label key={f} className="inline-flex items-center gap-2">
                <input type="checkbox" value={f} {...register('facilities')} />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">File Uploads</label>
          <input type="file" className="input" multiple {...register('files')} />
        </div>
      </div>
      <button type="submit" className="btn-primary">Register Hospital / NGO</button>
    </form>
  )
}

