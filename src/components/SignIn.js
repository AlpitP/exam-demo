import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../redux/api";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { signInFormFields } from "../utils/signInFormFIelds";

const SignIn = () => {
  const { formData } = useSelector((state) => state.formData);
  const signInHandler = async () => {
    await axiosInstance.post("users/Login", formData).then((response) => {
      console.log(response);
      localStorage.setItem("token", response.data.data.token);
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Sign In</h1>
      <div style={signInStyle}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form formFields={signInFormFields} />
          <CustomButton text="Sign In" onClick={signInHandler} />
          <p>
            Create New Account? <Link to="/">Sign Up</Link>
          </p>
          <p>
            Forgot Password? <Link to="/forgotPassword">Forgot Password</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
const signInStyle = {
  margin: 0,
  position: "absolute",
  top: " 50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  border: "1px solid black",
  padding: 10,
};
