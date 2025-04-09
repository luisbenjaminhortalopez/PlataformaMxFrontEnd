import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AppRouter } from './router'

const router = createBrowserRouter( AppRouter );

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = { router } />
  </StrictMode>,
)
