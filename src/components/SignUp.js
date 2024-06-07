import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../redux/api";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { signUpFormFields } from "../utils/signUpFormFields";

const SignUp = () => {
  const { formData } = useSelector((state) => state.formData);

  const signUpHandler = async () => {
    await axiosInstance.post("users/SignUp", formData);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: 180 }}>Sign Up</h1>
      <div style={signUpStyle}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form formFields={signUpFormFields} />
          <CustomButton text="Sign Up" onClick={signUpHandler} />
          <p>
            Already have an account? <Link to="/signIn">Sign In</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;

const signUpStyle = {
  margin: 0,
  display: "flex",
  position: "absolute",
  top: " 50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  border: "1px solid black",
  padding: 10,
};
