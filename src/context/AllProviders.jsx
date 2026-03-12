import React from 'react';
import { AuthProvider } from './AuthContext';
import { NotificationProvider } from './NotificationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProviders = ({ children }) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        {children}
        <ToastContainer 
            position="bottom-right"
            theme="colored"
            autoClose={5000}
        />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default AllProviders;
