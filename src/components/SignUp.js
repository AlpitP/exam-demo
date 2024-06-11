import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { clearForm } from "../redux/slices/formSlice";
import { showToast } from "../redux/slices/toastSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { signUpFormFields } from "../utils/signUpFormFields";
import { validation } from "../utils/validation";
import { toast } from "react-toastify";

const SignUp = () => {
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(clearForm());
    };
  }, [dispatch]);

  const signUpHandler = async () => {
    const valid = validation(signUpFormFields);
    if (valid) {
      const config = {
        url: "users/SignUp",
        data: formData,
        method: "POST",
      };
      const response = await dispatch(api({ name: "signUp", config }));

      const { statusCode } = response?.payload?.data ?? {};

      if (statusCode === SUCCESS_CODE) {
        navigate("/sign-in");
        dispatch(
          showToast({
            type: "info",
            message: "Please, Check you mail box for verification!",
          })
        );
      }
    } else {
      toast.error("Please Enter valid data.");
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: 180 }}>Sign Up</h1>
      <div style={signUpStyle}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form formFields={signUpFormFields} />
          <CustomButton
            text={loading.signUp === true ? "Loading" : "Sign Up"}
            onClick={signUpHandler}
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
