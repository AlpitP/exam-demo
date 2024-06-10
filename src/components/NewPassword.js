import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../redux/actions/apiAction";
import { clearForm } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { getLocalStorage } from "../utils/javascript";
import { newPasswordFormFields } from "../utils/newPasswordFormFields";

const NewPassword = () => {
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearForm());
    };
  }, [dispatch]);
  const token = getLocalStorage("token");
  console.log(token);
  const clickHandler = async () => {
    const config = {
      url: `users/ForgotPassword/Verify?token=${token}`,
      method: "post",
      data: formData,
    };
    await dispatch(api({ name: "new password", config }));
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Forgot Password</h1>
      <div style={forgotPasswordStyle}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form formFields={newPasswordFormFields} />
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

export default NewPassword;

const forgotPasswordStyle = {
  margin: 0,
  position: "absolute",
  top: " 50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  border: "1px solid black",
  padding: 10,
};
