import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUserInfo } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/javascript";
import CustomButton from "../shared/Button";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(removeUserInfo());
    navigate(`/sign-in`);
    toast.success("Successfully Logout.");
  };
  const role = getLocalStorage("role");
  const studentNavbar = [
    { path: "/student/exams", link: "View All Exams" },
    { path: "/student/profile", link: "Profile" },
    { path: "/student/resetPassword", link: "Reset Password" },
  ];
  const teacherNavbar = [
    { path: "/teacher/students", link: "View All Students" },
    { path: "/teacher/create-exam/question1", link: "Create Exam" },
    { path: "/teacher/view-exam", link: "View Exams" },
    { path: "/teacher/resetPassword", link: "Reset Password" },
  ];
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
    >
      <div>
        {role && role === "student" ? (
          <>
            {studentNavbar.map((ele, index) => {
              return (
                <Link to={ele.path} key={index} style={{ marginInline: 10 }}>
                  {ele.link}
                </Link>
              );
            })}
            {/* <Link to="/student/exams" style={{ marginInline: 10 }}>
              View All Exams
            </Link>
            <Link to="/student/profile" style={{ marginInline: 10 }}>
              Profile
            </Link>
            <Link to="/student/resetPassword" style={{ marginInline: 10 }}>
              Reset Password
            </Link> */}
          </>
        ) : (
          <>
            {teacherNavbar.map((ele, index) => {
              return (
                <Link to={ele.path} key={index} style={{ marginInline: 10 }}>
                  {ele.link}
                </Link>
              );
            })}
            {/* <Link to="/teacher/students" style={{ marginInline: 10 }}>
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
            </Link> */}
          </>
        )}
      </div>
      <CustomButton value="Log Out" onClick={logoutHandler} />
    </div>
  );
};

export default Sidebar;
