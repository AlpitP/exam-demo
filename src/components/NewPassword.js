import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NEW_PASSWORD, POST, SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { onChange } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { newPasswordFormFields } from "../discription/newPasswordFormFields";
import { validation } from "../utils/validation";
import useClearFormOnUnMound from "../shared/useClearFormOnUnmound";

// const clickHandler = async ({formData,dispatch,search,navigate}) => {
//   const valid = validation(newPasswordFormFields);
//   if (valid) {
//     const config = {
//       url: `users/ForgotPassword/Verify${search}`,
//       method: "post",
//       data: formData,
//     };
//     const response = await dispatch(api({ name: "newPassword", config }));
//     const { statusCode } = response?.payload?.data ?? {};

//     statusCode === SUCCESS_CODE && navigate(`/sign-in`);
//   }
// };

const NewPassword = () => {
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  useClearFormOnUnMound();

  const newPasswordHandler = async (e) => {
    e.preventDefault();
    dispatch(
      onChange({
        data: {
          Password: formData?.Password ?? "",
          ConfirmPassword: formData?.ConfirmPassword ?? "",
        },
      })
    );
    const valid = validation(newPasswordFormFields);
    if (valid) {
      const config = {
        url: `${NEW_PASSWORD}${search}`,
        method: POST,
        data: formData,
      };
      const response = await dispatch(api({ name: "newPassword", config }));
      const { statusCode } = response?.payload?.data ?? {};

      statusCode === SUCCESS_CODE && navigate(`/sign-in`);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>New Password</h1>
      <div style={newPasswordStyle}>
        <form onSubmit={newPasswordHandler}>
          <Form formFields={newPasswordFormFields} />
          <CustomButton
            value={loading.newPassword ? "Submitting..." : "Submit"}
            disabled={loading.newPassword}
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

const newPasswordStyle = {
  margin: 0,
  position: "absolute",
  top: " 50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  border: "1px solid black",
  padding: 10,
};
