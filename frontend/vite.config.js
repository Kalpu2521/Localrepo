import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/public',
    emptyOutDir: true,
  },
  // For development: use separate port with proxy
  // For production: build and serve from backend
  server: {
    proxy: {
      '/api': process.env.VITE_PROXY_TARGET || 'http://localhost:8000',
      '/health': process.env.VITE_PROXY_TARGET || 'http://localhost:8000'
    },
    port: 5173, // Dev server port (different from backend)
  }
})
