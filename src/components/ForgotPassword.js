import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD, POST, SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { onChange } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import useClearFormOnUnMound from "../shared/useClearFormOnUnmound";
import { forgotPasswordFormFields } from "../discription/forgotPasswordFormFields";
import { validation } from "../utils/validation";

const ForgotPassword = () => {
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useClearFormOnUnMound();

  const forgotPassword = async (e) => {
    e.preventDefault();
    dispatch(
      onChange({
        data: {
          email: formData?.email ?? "",
        },
      })
    );
    const valid = validation(forgotPasswordFormFields);
    if (valid) {
      const config = {
        url: FORGOT_PASSWORD,
        method: POST,
        data: formData,
      };
      const response = await dispatch(api({ name: "forgotPassword", config }));
      const { statusCode } = response?.payload?.data ?? {};
      statusCode === SUCCESS_CODE && navigate(`/sign-in`);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Forgot Password</h1>
      <div style={forgotPasswordStyle}>
        <form onSubmit={forgotPassword}>
          <Form formFields={forgotPasswordFormFields} />
          <CustomButton
            value={loading.forgotPassword ? "Submitting..." : "Submit"}
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
