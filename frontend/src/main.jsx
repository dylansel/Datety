import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AlertProvider } from './contexts/AlertContext'
import { AuthProvider } from './contexts/authContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider>
      <AuthProvider>
        <App />
     </AuthProvider>
    </AlertProvider>
  </React.StrictMode>,
)

