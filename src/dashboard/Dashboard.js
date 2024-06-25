import React from "react";
import AuthDashboard from "./AuthDashboard";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = ({ role }) => {
  return (
    <>
      {role === "teacher" ? (
        <TeacherDashboard />
      ) : role === "student" ? (
        <StudentDashboard />
      ) : (
        <AuthDashboard />
      )}
    </>
  );
};

export default Dashboard;
