import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUserInfo } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/javascript";
import CustomButton from "../shared/Button";
import { studentNavbar, teacherNavbar } from "../description/navbar";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(removeUserInfo());
    navigate(`/sign-in`);
    toast.success("Successfully Logout.");
  };
  const role = getLocalStorage("role");
  const navbar = role === "student" ? studentNavbar : teacherNavbar;
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
    >
      <div>
        {navbar.map((ele, index) => {
          return (
            <Link to={ele.path} key={index} style={{ marginInline: 10 }}>
              {ele.text}
            </Link>
          );
        })}
      </div>
      <CustomButton value="Log Out" onClick={logoutHandler} />
    </div>
  );
};

export default Navbar;
