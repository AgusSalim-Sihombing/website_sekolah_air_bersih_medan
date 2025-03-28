import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3006,
  },

  define: {
    'process.env.VITE_REACT_APP_API_BASE_URL': JSON.stringify(process.env.VITE_REACT_APP_API_BASE_URL)
  }


})
