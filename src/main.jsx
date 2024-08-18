import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider
} from "react-router-dom";
import Router from './Routes/Router.jsx';
import AuthProvider from './Providers/AuthProviders.jsx';

createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto'>
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </StrictMode>,
  </div>
)
