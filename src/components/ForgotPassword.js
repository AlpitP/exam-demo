import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { clearForm } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { forgotPasswordFormFields } from "../utils/forgotPasswordFormFields";

const ForgotPassword = () => {
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearForm());
    };
  }, [dispatch]);

  const clickHandler = async () => {
    const config = {
      url: "users/ForgotPassword",
      method: "post",
      data: formData,
    };
    const response = await dispatch(api({ name: "forgot password", config }));
    const { statusCode } = response?.payload?.data;

    statusCode === SUCCESS_CODE && navigate(`/newPassword`);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Forgot Password</h1>
      <div style={forgotPasswordStyle}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form formFields={forgotPasswordFormFields} />
          <CustomButton
            text={loading === true ? "Loading" : "Submit"}
            onClick={clickHandler}
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
