import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    // Tambahkan agar lightningcss bisa ditemukan
    exclude: ['lightningcss'],
  },
  build: {
    rollupOptions: {
      external: [
        // Tambahkan modul native yang bermasalah agar tidak dibundel
        '@tailwindcss/oxide-win32-x64-msvc',
      ],
    },
  },
  server: {
    port: 3006,
  },

  define: {
    'process.env.VITE_REACT_APP_API_BASE_URL': JSON.stringify(process.env.VITE_REACT_APP_API_BASE_URL)
  }
})


