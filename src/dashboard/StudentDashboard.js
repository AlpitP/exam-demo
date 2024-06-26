import React from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Student/Navbar";
import useClearFormOnUnMount from "../shared/useClearFormOnUnmount";

const StudentDashboard = () => {
  useClearFormOnUnMount();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default StudentDashboard;
