import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './assets/contexts/AuthContext'
import { ThemeContextProvider } from './assets/contexts/ThemeContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeContextProvider>
    </AuthProvider>
  </StrictMode>,
)
