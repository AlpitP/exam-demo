import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST, RESET_PASSWORD } from "../constants";
import api from "../redux/actions/apiAction";
import { clearForm, onChange } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { resetPasswordFormFields } from "../discription/resetPasswordFormFields";
import { validation } from "../utils/validation";
import useClearFormOnUnMound from "../shared/useClearFormOnUnmound";

// const resetPasswordHandler = async ({formData,dispatch}) => {
//   const valid = validation(resetPasswordFormFields);
//   if (valid) {
//     const config = {
//       url: `users/ResetPassword`,
//       method: "post",
//       data: formData,
//     };
//     await dispatch(api({ name: "resetPassword", config }));
//     dispatch(clearForm());
//   }
// };

const ResetPassword = () => {
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  useClearFormOnUnMound();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    dispatch(
      onChange({
        data: {
          oldPassword: formData?.oldPassword ?? "",
          Password: formData?.Password ?? "",
          ConfirmPassword: formData?.ConfirmPassword ?? "",
        },
      })
    );
    const valid = validation(resetPasswordFormFields);
    if (valid) {
      const config = {
        url: RESET_PASSWORD,
        method: POST,
        data: formData,
      };
      await dispatch(api({ name: "resetPassword", config }));
      dispatch(clearForm());
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={resetPasswordHandler}>
        <Form formFields={resetPasswordFormFields} />
        <CustomButton
          value={loading.resetPassword ? "Submitting.." : "Submit"}
          disabled={loading.resetPassword}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
