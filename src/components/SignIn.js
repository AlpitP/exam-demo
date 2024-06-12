import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInHandler } from "../container/signInHandler";
import { clearForm } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { signInFormFields } from "../utils/signInFormFIelds";

// const signInHandler = async ({ formData, dispatch, navigate }) => {
//   const valid = validation(signInFormFields);
//   if (valid) {
//     const config = {
//       url: "users/Login",
//       data: formData,
//       method: "POST",
//     };
//     const response = await dispatch(api({ name: "signIn", config }));
//     const { data, statusCode } = response?.payload?.data ?? {};

//     statusCode === SUCCESS_CODE && navigate(`/${data?.role}`);
//   }
// };

const SignIn = () => {
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      dispatch(clearForm());
    };
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Sign In</h1>
      <div style={signInStyle}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form formFields={signInFormFields} />
          <CustomButton
            text={loading.signIn === true ? "Signing In..." : "Sign In"}
            onClick={() => signInHandler({ formData, dispatch, navigate })}
            disabled={loading.signIn}
          />
          <p>
            Create New Account? <Link to="/sign-up">Sign Up</Link>
          </p>
          <p>
            Forgot Password? <Link to="/forgot-Password">Forgot Password</Link>
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
