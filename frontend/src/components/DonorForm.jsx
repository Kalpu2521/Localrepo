import { useForm } from 'react-hook-form'

const groups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"]

export default function DonorForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input className="input" {...register('fullName', { required: 'Full name is required' })} />
          {errors.fullName && <p className="err">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Gender</label>
          <select className="input" {...register('gender', { required: 'Gender is required' })}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <p className="err">{errors.gender.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Date of Birth</label>
          <input type="date" className="input" {...register('dob', { required: 'DOB is required' })} />
          {errors.dob && <p className="err">{errors.dob.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Mobile Number</label>
          <input className="input" {...register('mobile', { required: 'Mobile is required', pattern: { value: /^\+?[0-9]{10,14}$/, message: 'Invalid number' } })} />
          {errors.mobile && <p className="err">{errors.mobile.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Email (optional)</label>
          <input className="input" {...register('email', { pattern: { value: /.+@.+\..+/, message: 'Invalid email' } })} />
          {errors.email && <p className="err">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Blood Group</label>
          <select className="input" {...register('bloodGroup', { required: 'Required' })}>
            <option value="">Select</option>
            {groups.map(g => <option key={g}>{g}</option>)}
          </select>
          {errors.bloodGroup && <p className="err">{errors.bloodGroup.message}</p>}
        </div>
        <div className="md:col-span-2 grid md:grid-cols-4 gap-4">
          <input placeholder="Address" className="input" {...register('address', { required: 'Required' })} />
          <input placeholder="City" className="input" {...register('city', { required: 'Required' })} />
          <input placeholder="State" className="input" {...register('state', { required: 'Required' })} />
          <input placeholder="PIN" className="input" {...register('pin', { required: 'Required' })} />
        </div>
        <div>
          <label className="block text-sm mb-1">Last Donation Date</label>
          <input type="date" className="input" {...register('lastDonationDate')} />
        </div>
        <div>
          <label className="block text-sm mb-1">Willingness to Donate</label>
          <select className="input" {...register('willing', { required: 'Required' })}>
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          {errors.willing && <p className="err">{errors.willing.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Preferred Donation Type</label>
          <select className="input" {...register('donationType', { required: 'Required' })}>
            <option value="">Select</option>
            <option>Whole Blood</option>
            <option>Plasma</option>
            <option>Platelets</option>
          </select>
          {errors.donationType && <p className="err">{errors.donationType.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Health Details</label>
          <textarea className="input" rows={3} placeholder="Disease info, Weight, Medication" {...register('health')} />
        </div>
        <div className="md:col-span-2 grid md:grid-cols-3 gap-4">
          <input placeholder="Emergency Contact Name" className="input" {...register('emgName', { required: 'Required' })} />
          <input placeholder="Relation" className="input" {...register('emgRelation', { required: 'Required' })} />
          <input placeholder="Number" className="input" {...register('emgPhone', { required: 'Required' })} />
        </div>
      </div>
      <button type="submit" className="btn-primary">Register as Donor</button>
    </form>
  )
}

