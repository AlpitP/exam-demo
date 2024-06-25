import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpHandler } from "../container/signUpHandler";
import { clearForm } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { signUpFormFields } from "../utils/signUpFormFields";

// const signUpHandler = async ({ formData, dispatch, navigate }) => {
//   const valid = validation(signUpFormFields);
//   if (valid) {
//     const config = {
//       url: "users/SignUp",
//       data: formData,
//       method: "POST",
//     };
//     const response = await dispatch(api({ name: "signUp", config }));

//     const { statusCode } = response?.payload?.data ?? {};

//     if (statusCode === SUCCESS_CODE) {
//       navigate("/sign-in");
//       dispatch(
//         showToast({
//           type: "info",
//           message: "Please, Check you mail box for verification!",
//         })
//       );
//     }
//   }
// };

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

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: 180 }}>Sign Up</h1>
      <div style={signUpStyle}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form formFields={signUpFormFields} />
          <CustomButton
            value={loading.signUp === true ? "Signing Up..." : "Sign Up"}
            onClick={() => signUpHandler({ formData, dispatch, navigate })}
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
