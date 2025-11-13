import { useForm } from 'react-hook-form'

const groups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"]

export default function RequirementForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input placeholder="Patient Name" className="input" {...register('patientName', { required: 'Required' })} />
        <select className="input" {...register('bloodGroup', { required: 'Required' })}>
          <option value="">Blood Group Required</option>
          {groups.map(g => <option key={g}>{g}</option>)}
        </select>
        <input placeholder="Quantity Required" className="input" {...register('quantity', { required: 'Required' })} />
        <input placeholder="City / Hospital Name" className="input" {...register('place', { required: 'Required' })} />
        <input placeholder="Contact Person" className="input" {...register('contact', { required: 'Required' })} />
        <input placeholder="Mobile Number" className="input" {...register('mobile', { required: 'Required' })} />
        <input placeholder="Email (optional)" className="input md:col-span-2" {...register('email')} />
      </div>
      <button type="submit" className="btn-primary">Post Requirement</button>
    </form>
  )
}

