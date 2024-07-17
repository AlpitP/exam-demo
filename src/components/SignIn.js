import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { POST, SIGN_IN, SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { onChange } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import useClearFormOnUnMount from "../shared/useClearFormOnUnmount";
import { signInFormFields } from "../description/signInFormFIelds";
import { validation } from "../utils/validation";
import { toast } from "react-toastify";
import { setUser } from "../redux/slices/userSlice";

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

  useClearFormOnUnMount();

  const signInHandler = async (e) => {
    e.preventDefault();
    dispatch(
      onChange({
        data: {
          email: formData?.email ?? "",
          password: formData?.password ?? "",
        },
      })
    );
    const valid = validation(signInFormFields);
    if (valid) {
      const config = {
        url: SIGN_IN,
        data: formData,
        method: POST,
      };
      const response = await dispatch(api({ name: "signIn", config }));
      const { data, statusCode, message } = response?.payload?.data ?? {};
      statusCode === SUCCESS_CODE && navigate(`/${data?.role}`);
      toast.success(message);
      dispatch(setUser(data));
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Sign In</h1>
      <div style={signInStyle}>
        <form onSubmit={signInHandler}>
          <Form formFields={signInFormFields} />
          <CustomButton
            value={loading.signIn ? "Signing In..." : "Sign In"}
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
