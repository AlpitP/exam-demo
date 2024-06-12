import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordHandler } from "../container/forgotPasswordHandler";
import { clearForm } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { forgotPasswordFormFields } from "../utils/forgotPasswordFormFields";

// const clickHandler = async ({ formData, dispatch, navigate }) => {
//   const valid = validation(forgotPasswordFormFields);
//   if (valid) {
//     const config = {
//       url: "users/ForgotPassword",
//       method: "post",
//       data: formData,
//     };
//     await dispatch(api({ name: "forgotPassword", config }));
//     navigate(`/sign-in`);
//   }
// };

const ForgotPassword = () => {
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
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Forgot Password</h1>
      <div style={forgotPasswordStyle}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form formFields={forgotPasswordFormFields} />
          <CustomButton
            text={loading.forgotPassword === true ? "Submitting..." : "Submit"}
            onClick={() =>
              forgotPasswordHandler({ formData, dispatch, navigate })
            }
            disabled={loading.forgotPassword}
          />
          <p>
            Want to Sign in? <Link to="/sign-in">Sign In</Link>
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
