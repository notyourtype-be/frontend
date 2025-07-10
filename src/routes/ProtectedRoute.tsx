import React from "react";
import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    // Agar token nahi hai, login page par redirect karo
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, toh children render karo (homepage ya koi aur page)
  return children;
};

export default ProtectedRoute;
