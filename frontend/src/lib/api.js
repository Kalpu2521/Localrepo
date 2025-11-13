import axios from 'axios'

// Use environment variable for API URL, fallback to proxy in development
const apiBaseURL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : '/api')

const api = axios.create({
  baseURL: apiBaseURL,
})

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('token', token)
  } else {
    delete api.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
  }
}

// Load token on startup if present
const saved = localStorage.getItem('token')
if (saved) setAuthToken(saved)

export default api

