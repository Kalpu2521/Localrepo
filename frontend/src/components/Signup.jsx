import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const [role, setRole] = useState('donor')
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm()
  const navigate = useNavigate()

  const password = watch('password')
  const { login } = useAuth()

  async function onSubmit(values) {
    setError('')
    try {
      // Validate password match
      if (values.password !== values.confirmPassword) {
        setError('Passwords do not match')
        return
      }

      const { data } = await api.post('/api/auth/register', {
        name: values.name,
        email: values.email,
        password: values.password,
        role: role || 'donor',
      })
      
      login(data.token, data.user)
      
      // Redirect based on role
      const r = role || data.user?.role
      if (r === 'donor') navigate('/dashboard/donor')
      else if (r === 'requirement' || r === 'recipient') navigate('/dashboard/requirement')
      else navigate('/dashboard/hospital')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      
      <div className="flex gap-2 mb-4">
        <button 
          type="button"
          onClick={() => setRole('donor')} 
          className={`tab flex-1 ${role === 'donor' ? 'active' : ''}`}
        >
          Donor
        </button>
        <button 
          type="button"
          onClick={() => setRole('recipient')} 
          className={`tab flex-1 ${role === 'recipient' ? 'active' : ''}`}
        >
          Recipient
        </button>
        <button 
          type="button"
          onClick={() => setRole('hospital')} 
          className={`tab flex-1 ${role === 'hospital' ? 'active' : ''}`}
        >
          Hospital/NGO
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input 
            placeholder="Full Name" 
            className="input" 
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })} 
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input 
            type="email"
            placeholder="Email Address" 
            className="input" 
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })} 
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input 
            type="password"
            placeholder="Password" 
            className="input" 
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })} 
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <input 
            type="password"
            placeholder="Confirm Password" 
            className="input" 
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })} 
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button 
          type="submit"
          className="btn-primary w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
          Login here
        </Link>
      </div>
    </div>
  )
}

