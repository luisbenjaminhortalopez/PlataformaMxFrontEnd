import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PlataformaMxApp } from './PlataformaMxApp';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlataformaMxApp />
  </StrictMode>,
)
