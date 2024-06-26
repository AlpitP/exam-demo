import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Student/Navbar";
import useClearFormOnUnMount from "../shared/useClearFormOnUnmount";

const TeacherDashboard = () => {
  useClearFormOnUnMount();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default TeacherDashboard;
