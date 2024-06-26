import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Student/Navbar";
import useClearFormOnUnMound from "../shared/useClearFormOnUnmound";

const TeacherDashboard = () => {
  useClearFormOnUnMound();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default TeacherDashboard;
