import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * AuthLayout protects routes that require authentication
 * Redirects to login page if user is not authenticated
 */
const AuthLayout = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    // If still loading auth state, can show a loading spinner
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
};

export default AuthLayout;
