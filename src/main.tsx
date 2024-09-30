import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import DesignerContextProvider from './context/DesignerContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignerContextProvider>
    <App />
    </DesignerContextProvider>
  </StrictMode>,
)
