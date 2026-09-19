import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/cyrillic-400.css'
import '@fontsource/inter/cyrillic-500.css'
import '@fontsource/inter/cyrillic-600.css'
import '@fontsource/montserrat/cyrillic-500.css'
import '@fontsource/jetbrains-mono/cyrillic-400.css'
import './styles/tokens.css'
import './styles/landing.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
