import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="h-screen flex items-center justify-center font-black">Loading...</div>;
    if (user) return children;

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="h-screen flex items-center justify-center font-black">Loading...</div>;
    if (user && user.role === 'admin') return children;

    return <Navigate to="/" state={{ from: location }} replace />;
};

export const OrganizationRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (user && (user.role === 'organization' || user.role === 'admin')) return children;

    return <Navigate to="/" state={{ from: location }} replace />;
};

export const ResearcherRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (user && (user.role === 'researcher' || user.role === 'admin')) return children;

    return <Navigate to="/" state={{ from: location }} replace />;
};
