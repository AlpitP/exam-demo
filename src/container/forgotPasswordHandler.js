import { POST, SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { forgotPasswordFormFields } from "../utils/forgotPasswordFormFields";
import { allFormFieldValidation } from "../utils/fullFormValidation";

export const forgotPasswordHandler = async ({
  formData,
  dispatch,
  navigate,
}) => {
  const valid = allFormFieldValidation(forgotPasswordFormFields);
  if (valid) {
    const config = {
      url: "users/ForgotPassword",
      method: POST,
      data: formData,
    };
    const response = await dispatch(api({ name: "forgotPassword", config }));
    const { statusCode } = response?.payload?.data ?? {};
    statusCode === SUCCESS_CODE && navigate(`/sign-in`);
  }
};
