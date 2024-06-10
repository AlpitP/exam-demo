import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const logoutHandler = () => {
    console.log("Logout");
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
    >
      <div>
        <Link to="/student/exams" style={{ marginInline: 10 }}>
          View All Exams
        </Link>
        <Link to="/student/profile" style={{ marginInline: 10 }}>
          Profile
        </Link>
      </div>
      {/* <button onClick={logoutHandler}>Log Out</button> */}
    </div>
  );
};

export default Sidebar;
