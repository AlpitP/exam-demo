import React from "react";
import { forgotPasswordFormFields } from "../utils/forgotPasswordFormFields";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { Link } from "react-router-dom";
import { axiosInstance } from "../redux/api";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const { formData } = useSelector((state) => state.formData);
  const clickHandler = async () => {
    await axiosInstance.post("users/ForgotPassword", formData);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Forgot Password</h1>
      <div style={forgotPasswordStyle}>
        <form>
          <Form formFields={forgotPasswordFormFields} />
          <CustomButton text="Submit" onClick={clickHandler} />
          <p>
            Want to Sign in? <Link to="/signIn">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

const forgotPasswordStyle = {
  margin: 0,
  position: "absolute",
  top: " 50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  border: "1px solid black",
  padding: 10,
};
