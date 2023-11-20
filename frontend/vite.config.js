import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //instead of using cors we treat them as the same directory
    proxy: {
      '/socket.io': {
        target: 'http://localhost:4000',
        ws: true //web socket library
      }
    }
  }
})
