import React from 'react'
import ReactDOM from 'react-dom/client'
import router  from './Router';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import './axiosConfig.js'
import 'react-toastify/dist/ReactToastify.css';
import CartProvider from './hook/useCart';
import { AuthProvider } from './hook/useAuth.jsx';
import { LoadingProvider } from './hook/useLoading.jsx';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
    <LoadingProvider>
      <CartProvider>
      <RouterProvider router={router} />
        <ToastContainer
        position='button-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        />
      </CartProvider>


    </LoadingProvider>
    </AuthProvider>

)
