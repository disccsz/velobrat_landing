import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/velobrat_landing/',
  server: { port: 5174 },
  preview: { port: 4174 },
})
