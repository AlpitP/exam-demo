import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUserInfo } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/javascript";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(removeUserInfo());
    navigate(`/sign-in`);
    toast.success("Successfully Logout.");
  };
  const role = getLocalStorage("role");
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
    >
      <div>
        {role && role === "student" ? (
          <>
            <Link to="/student/exams" style={{ marginInline: 10 }}>
              View All Exams
            </Link>
            <Link to="/student/profile" style={{ marginInline: 10 }}>
              Profile
            </Link>
            <Link to="/student/resetPassword" style={{ marginInline: 10 }}>
              Reset Password
            </Link>
          </>
        ) : (
          <>
            <Link to="/teacher/students" style={{ marginInline: 10 }}>
              View All Students
            </Link>
            <Link
              to="/teacher/create-exam/question1"
              style={{ marginInline: 10 }}
            >
              Create Exam
            </Link>
            <Link to="/teacher/view-exam" style={{ marginInline: 10 }}>
              View Exam
            </Link>
            <Link to="/teacher/resetPassword" style={{ marginInline: 10 }}>
              Reset Password
            </Link>
          </>
        )}
      </div>
      <button onClick={logoutHandler}>Log Out</button>
    </div>
  );
};

export default Sidebar;
