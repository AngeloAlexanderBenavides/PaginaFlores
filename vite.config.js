import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Alerta si algún chunk supera 400KB (útil para detectar imports pesados)
    chunkSizeWarningLimit: 400,
  }
})
