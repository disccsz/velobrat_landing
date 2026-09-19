import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { port: 5174 },
  preview: { port: 4174 },
})
