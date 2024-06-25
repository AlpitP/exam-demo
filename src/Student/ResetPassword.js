import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordHandler } from "../container/resetPasswordHandler";
import { clearForm } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { resetPasswordFormFields } from "../utils/resetPasswordFormFields";

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
  useEffect(() => {
    return () => dispatch(clearForm());
  }, [dispatch]);
  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <Form formFields={resetPasswordFormFields} />
        <CustomButton
          value={loading.resetPassword ? "Submitting.." : "Submit"}
          onClick={() => resetPasswordHandler({ formData, dispatch })}
          disabled={loading.resetPassword}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
