import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/authentication";
import Dashboard from "../dashboard/Dashboard";
import { getLocalStorage } from "../utils/javascript";

const ProtectedRoute = ({ role }) => {
  const currentRole = getLocalStorage("role");

  if (!isLoggedIn()) {
    return <Navigate to="/sign-in" />;
  }

  if (role && role !== currentRole) {
    return <Navigate to={`/${currentRole}`} />;
  }

  return <Dashboard role={currentRole} />;
};

export default ProtectedRoute;
