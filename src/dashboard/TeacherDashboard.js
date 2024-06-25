import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { clearForm } from "../redux/slices/formSlice";
import Sidebar from "../Student/Navbar";

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(clearForm());
  });
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default TeacherDashboard;
