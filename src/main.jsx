import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'

import AllProviders from './context/AllProviders';
import { router } from './routes/routes';

createRoot(document.getElementById('root')).render(
   <StrictMode>
     <AllProviders>
        <RouterProvider 
          router={router} 
          fallbackElement={
            <div className='h-screen flex items-center justify-center bg-slate-50 text-green-600 font-bold'>
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xl tracking-widest uppercase">EcoReport Loading...</p>
              </div>
            </div>
          } 
        />
     </AllProviders>
  </StrictMode>
)
