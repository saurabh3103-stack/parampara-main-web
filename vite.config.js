import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["swiper"],
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
  },
  plugins: [react()],
})
