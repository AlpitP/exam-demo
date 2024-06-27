import React from "react";
import { Outlet } from "react-router-dom";
import { Role } from "../description/role.enums";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = ({ role }) => {
  if (role === Role.TEACHER) return <TeacherDashboard />;
  if (role === Role.STUDENT) return <StudentDashboard />;
  return <Outlet />;
};

export default Dashboard;
