import React from "react";
import { Link } from "react-router-dom";
import { removeUserInfo } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(removeUserInfo());
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
    >
      <div>
        <Link to="/teacher/students" style={{ marginInline: 10 }}>
          View All Students
        </Link>
        <Link to="/teacher/create-exam" style={{ marginInline: 10 }}>
          Create Exam
        </Link>
      </div>
      <button onClick={logoutHandler}>Log Out</button>
    </div>
  );
};

export default Sidebar;
