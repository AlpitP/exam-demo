import { SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { newPasswordFormFields } from "../utils/newPasswordFormFields";
import { validation } from "../utils/validation";

export const newPasswordHandler = async ({
  formData,
  dispatch,
  search,
  navigate,
}) => {
  const valid = validation(newPasswordFormFields);
  if (valid) {
    const config = {
      url: `users/ForgotPassword/Verify${search}`,
      method: "post",
      data: formData,
    };
    const response = await dispatch(api({ name: "newPassword", config }));
    const { statusCode } = response?.payload?.data ?? {};

    statusCode === SUCCESS_CODE && navigate(`/sign-in`);
  }
};
