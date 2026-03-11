import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { RotateLoader } from 'react-spinners';

const RoleRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className='h-[80vh] flex items-center justify-center'>
                <RotateLoader color="#54b355" size={20} />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export const PrivateRoute = ({ children }) => <RoleRoute>{children}</RoleRoute>;
export const AdminRoute = ({ children }) => <RoleRoute allowedRoles={['admin']}>{children}</RoleRoute>;
export const OrganizationRoute = ({ children }) => <RoleRoute allowedRoles={['admin', 'organization']}>{children}</RoleRoute>;
export const ResearcherRoute = ({ children }) => <RoleRoute allowedRoles={['admin', 'researcher']}>{children}</RoleRoute>;
