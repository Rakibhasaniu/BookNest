import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      
      <div>
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  </StrictMode>,
)
