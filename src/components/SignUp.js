import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { POST, SIGN_UP, SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { onChange } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import useClearFormOnUnMount from "../shared/useClearFormOnUnmount";
import { signUpFormFields } from "../description/signUpFormFields";
import { validation } from "../utils/validation";

const SignUp = () => {
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useClearFormOnUnMount();

  const signUpHandler = async (e) => {
    e.preventDefault();
    dispatch(
      onChange({
        data: {
          email: formData?.email ?? "",
          password: formData?.password ?? "",
          role: formData?.role ?? "",
          name: formData?.name ?? "",
        },
      })
    );
    const valid = validation(signUpFormFields);
    if (valid) {
      const config = {
        url: SIGN_UP,
        data: formData,
        method: POST,
      };
      const response = await dispatch(api({ name: "signUp", config }));

      const { statusCode, message } = response?.payload?.data ?? {};
      toast.success(message);
      if (statusCode === SUCCESS_CODE) {
        navigate("/sign-in");
        toast.info("Please, Check you mail box for verification!");
      }
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: 180 }}>Sign Up</h1>
      <div style={signUpStyle}>
        <form onSubmit={signUpHandler}>
          <Form formFields={signUpFormFields} />
          <CustomButton
            value={loading.signUp ? "Signing Up..." : "Sign Up"}
            disabled={loading.signUp}
          />
          <p>
            Already have an account? <Link to="/sign-in">Sign In</Link>
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
