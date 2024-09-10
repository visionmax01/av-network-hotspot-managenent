import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ authenticated, children }) => {
  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
