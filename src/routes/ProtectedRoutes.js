import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/authentication";
import Dashboard from "../dashboard/Dashboard";

const ProtectedRoute = ({ role }) => {
  const currentRole = localStorage.getItem("role");

  if (!isLoggedIn()) {
    return <Navigate to="/sign-in" />;
  }

  if (role && role !== currentRole) {
    return <Navigate to={`/${currentRole}`} />;
  }

  return <Dashboard role={currentRole} />;
};

export default ProtectedRoute;
