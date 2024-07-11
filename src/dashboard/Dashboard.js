import React from "react";
import { Outlet } from "react-router-dom";
import { userRole } from "../description/role.enums";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = ({ role }) => {
  if (role === userRole.TEACHER) return <TeacherDashboard />;
  if (role === userRole.STUDENT) return <StudentDashboard />;
  return <Outlet />;
};

export default Dashboard;
