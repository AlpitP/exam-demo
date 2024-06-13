import api from "../redux/actions/apiAction";
import { clearForm } from "../redux/slices/formSlice";
import { resetPasswordFormFields } from "../utils/resetPasswordFormFields";
import { validation } from "../utils/validation";

export const resetPasswordHandler = async ({ formData, dispatch }) => {
  const valid = validation(resetPasswordFormFields);
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
