import { POST, SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { allFormFieldValidation } from "../utils/fullFormValidation";
import { newPasswordFormFields } from "../utils/newPasswordFormFields";

export const newPasswordHandler = async ({
  formData,
  dispatch,
  search,
  navigate,
}) => {
  const valid = allFormFieldValidation(newPasswordFormFields);
  if (valid) {
    const config = {
      url: `users/ForgotPassword/Verify${search}`,
      method: POST,
      data: formData,
    };
    const response = await dispatch(api({ name: "newPassword", config }));
    const { statusCode } = response?.payload?.data ?? {};

    statusCode === SUCCESS_CODE && navigate(`/sign-in`);
  }
};
