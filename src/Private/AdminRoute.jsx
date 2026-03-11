import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router';
import { RotateLoader } from 'react-spinners';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className='h-[80vh] flex items-center justify-center'>
                <RotateLoader color="#54b355" size={20} />
            </div>
        );
    }

    if (user && user.role === 'Admin') {
        return children;
    }

    return <Navigate to="/" replace />;
};

export default AdminRoute;
