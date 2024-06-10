import React from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const StudentDashboard = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default StudentDashboard;
