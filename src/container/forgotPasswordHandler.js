import { SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { forgotPasswordFormFields } from "../utils/forgotPasswordFormFields";
import { validation } from "../utils/validation";

export const forgotPasswordHandler = async ({
  formData,
  dispatch,
  navigate,
}) => {
  const valid = validation(forgotPasswordFormFields);
  console.log(valid);
  if (valid) {
    const config = {
      url: "users/ForgotPassword",
      method: "post",
      data: formData,
    };
    const response = await dispatch(api({ name: "forgotPassword", config }));
    const { statusCode } = response?.payload?.data ?? {};
    statusCode === SUCCESS_CODE && navigate(`/sign-in`);
  }
};
