import React from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AuthDashboard = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthDashboard;
