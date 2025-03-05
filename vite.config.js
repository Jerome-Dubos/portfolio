import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  server: {
    fs: {
      strict: false, // Permet l'accès aux fichiers publics
    },
  },
  plugins: [react()],
})

