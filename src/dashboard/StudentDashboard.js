import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { clearForm } from "../redux/slices/formSlice";
import { useDispatch } from "react-redux";
import Sidebar from "../Student/Navbar";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(clearForm());
  });
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default StudentDashboard;
