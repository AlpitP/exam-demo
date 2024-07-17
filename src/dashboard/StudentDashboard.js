import React from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useClearFormOnUnMount from "../shared/useClearFormOnUnmount";

const StudentDashboard = () => {
  useClearFormOnUnMount();
  return (
    <>
      <Outlet />
    </>
  );
};

export default StudentDashboard;
