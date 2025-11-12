import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual role
    switch (user.role) {
      case 'ADMIN':
        return <Navigate to="/admin-dashboard" replace />;
      case 'TECHNICIAN':
        return <Navigate to="/worker-dashboard" replace />;
      case 'CUSTOMER':
      default:
        return <Navigate to="/customer-dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;