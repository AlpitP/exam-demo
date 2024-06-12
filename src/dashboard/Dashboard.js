import React from "react";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import AuthDashboard from "./AuthDashboard";

const Dashboard = ({ role }) => {
  return role === "teacher" ? (
    <TeacherDashboard />
  ) : role === "student" ? (
    <StudentDashboard />
  ) : (
    <AuthDashboard />
  );
};

export default Dashboard;
