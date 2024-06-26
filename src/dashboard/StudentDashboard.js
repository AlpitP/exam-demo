import React from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Student/Navbar";
import useClearFormOnUnMound from "../shared/useClearFormOnUnmound";

const StudentDashboard = () => {
  useClearFormOnUnMound();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default StudentDashboard;
