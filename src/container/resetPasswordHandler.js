import api from "../redux/actions/apiAction";
import { clearForm } from "../redux/slices/formSlice";
import { fullFormValidation } from "../utils/fullForlValidation";
import { resetPasswordFormFields } from "../utils/resetPasswordFormFields";

export const resetPasswordHandler = async ({ formData, dispatch }) => {
  const valid = fullFormValidation(resetPasswordFormFields);
  if (valid) {
    const config = {
      url: `users/ResetPassword`,
      method: "post",
      data: formData,
    };
    await dispatch(api({ name: "resetPassword", config }));
    dispatch(clearForm());
  }
};