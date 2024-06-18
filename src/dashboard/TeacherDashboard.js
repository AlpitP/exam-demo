import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { clearForm } from "../redux/slices/formSlice";

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(clearForm());
  });
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default TeacherDashboard;
