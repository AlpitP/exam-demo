import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getStateFromLocalStorage } from "../utils/javascript";
import CustomButton from "../shared/Button";
import {
  studentNavbarFields,
  teacherNavbarFields,
} from "../description/navbar";
import { Role } from "../description/role.enums";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(removeUser());
    navigate(`/sign-in`);
    toast.success("Successfully Logout.");
  };
  const role = getStateFromLocalStorage("role");
  const navbarFields =
    role === Role.STUDENT ? studentNavbarFields : teacherNavbarFields;
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
    >
      <div>
        {navbarFields.map((ele, index) => {
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
