import React from "react";
import { Outlet } from "react-router-dom";
import useClearFormOnUnMount from "../shared/useClearFormOnUnmount";

const TeacherDashboard = () => {
  useClearFormOnUnMount();
  return (
    <>
      <Outlet />
    </>
  );
};

export default TeacherDashboard;
