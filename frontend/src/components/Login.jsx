import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api, { setAuthToken } from '../lib/api'

export default function Login() {
  const [role, setRole] = useState('donor')
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const navigate = useNavigate()

  async function onSubmit(values) {
    const { data } = await api.post('/api/auth/login', {
      email: values.username,
      password: values.password,
    })
    setAuthToken(data.token)
    const r = role || data.user?.role
    if (r === 'donor') navigate('/dashboard/donor')
    else if (r === 'requirement' || r === 'recipient') navigate('/dashboard/requirement')
    else navigate('/dashboard/hospital')
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex gap-2 mb-4">
        <button onClick={()=>setRole('donor')} className={`tab ${role==='donor'?'active':''}`}>Donor Login</button>
        <button onClick={()=>setRole('requirement')} className={`tab ${role==='requirement'?'active':''}`}>Requirement Login</button>
        <button onClick={()=>setRole('hospital')} className={`tab ${role==='hospital'?'active':''}`}>Hospital / NGO Login</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input placeholder="Email or Mobile" className="input" {...register('username')} />
        <input placeholder="Password" type="password" className="input" {...register('password')} />
        <button className="btn-primary w-full" disabled={isSubmitting}>{isSubmitting? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  )
}

