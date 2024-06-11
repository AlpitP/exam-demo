import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { clearForm } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { newPasswordFormFields } from "../utils/newPasswordFormFields";
import { validation } from "../utils/validation";
import { toast } from "react-toastify";

const NewPassword = () => {
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();

  useEffect(() => {
    return () => {
      dispatch(clearForm());
    };
  }, [dispatch]);

  const clickHandler = async () => {
    const valid = validation(newPasswordFormFields);
    if (valid) {
      const config = {
        url: `users/ForgotPassword/Verify${search}`,
        method: "post",
        data: formData,
      };
      const response = await dispatch(api({ name: "newPassword", config }));
      const { statusCode } = response?.payload?.data ?? {};

      statusCode === SUCCESS_CODE && navigate(`/sign-in`);
    } else {
      toast.error("Please Enter valid data.");
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>New Password</h1>
      <div style={forgotPasswordStyle}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form formFields={newPasswordFormFields} />
          <CustomButton
            text={loading.newPassword === true ? "Loading" : "Submit"}
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
