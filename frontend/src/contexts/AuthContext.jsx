import { createContext, useContext, useState, useEffect } from 'react'
import api, { setAuthToken } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  async function fetchUser() {
    try {
      const { data } = await api.get('/api/auth/me')
      setUser(data.user)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      // Clear invalid token
      if (error.response?.status === 401) {
        setAuthToken(null)
      }
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  function login(token, userData) {
    setAuthToken(token)
    setUser(userData)
  }

  function logout() {
    setAuthToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

