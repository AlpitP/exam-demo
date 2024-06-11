import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { clearForm } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { signInFormFields } from "../utils/signInFormFIelds";
import { validation } from "../utils/validation";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearForm());
    };
  }, [dispatch]);

  const signInHandler = async () => {
    const valid = validation(signInFormFields);
    if (valid) {
      const config = {
        url: "users/Login",
        data: formData,
        method: "POST",
      };
      const response = await dispatch(api({ name: "signIn", config }));
      const { data, statusCode } = response?.payload?.data ?? {};

      statusCode === SUCCESS_CODE && navigate(`/${data?.role}`);
    } else {
      toast.error("Please Enter valid data.");
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Sign In</h1>
      <div style={signInStyle}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form formFields={signInFormFields} />
          <CustomButton
            text={loading.signIn === true ? "Loading" : "Sign In"}
            onClick={signInHandler}
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
