import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [role, setRole] = useState('donor')
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const navigate = useNavigate()
  const { login } = useAuth()

  async function onSubmit(values) {
    setError('')
    try {
      const { data } = await api.post('/api/auth/login', {
        email: values.username,
        password: values.password,
      })
      login(data.token, data.user)
      const r = role || data.user?.role
      if (r === 'donor') navigate('/dashboard/donor')
      else if (r === 'requirement' || r === 'recipient') navigate('/dashboard/requirement')
      else navigate('/dashboard/hospital')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex gap-2 mb-4">
        <button onClick={()=>setRole('donor')} className={`tab ${role==='donor'?'active':''}`}>Donor Login</button>
        <button onClick={()=>setRole('requirement')} className={`tab ${role==='requirement'?'active':''}`}>Requirement Login</button>
        <button onClick={()=>setRole('hospital')} className={`tab ${role==='hospital'?'active':''}`}>Hospital / NGO Login</button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input placeholder="Email or Mobile" className="input" {...register('username')} />
        <input placeholder="Password" type="password" className="input" {...register('password')} />
        <button className="btn-primary w-full" disabled={isSubmitting}>{isSubmitting? 'Logging in...' : 'Login'}</button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <Link to="/signup" className="text-red-600 hover:text-red-700 font-medium">
          Sign up here
        </Link>
      </div>
    </div>
  )
}

