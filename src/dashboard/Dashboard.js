import React from "react";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = ({ role }) => {
  return role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />;
};

export default Dashboard;
