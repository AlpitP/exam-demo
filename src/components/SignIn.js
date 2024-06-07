import React from "react";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { signInFormFields } from "../utils/signInFormFIelds";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Sign In</h1>
      <div style={signInStyle}>
        <form>
          <Form formFields={signInFormFields} />
          <CustomButton text="Sign In" onClick={() => console.log("SignIn")} />
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
