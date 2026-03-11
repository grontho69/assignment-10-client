import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router/dom'
import { router } from './routes/routes.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './context/AuthProvider';
import { NotificationProvider } from './context/NotificationContext';


createRoot(document.getElementById('root')).render(
   <StrictMode>
    
     
     <NotificationProvider>
        <AuthProvider>
           <RouterProvider router={router} fallbackElement={<div className='h-screen flex items-center justify-center bg-slate-50 text-green-600 font-bold'>EcoReport Loading...</div>} />
          <ToastContainer />
            </AuthProvider>
     </NotificationProvider>
      
    
  </StrictMode>
)
