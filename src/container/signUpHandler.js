import { SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { showToast } from "../redux/slices/toastSlice";
import { signUpFormFields } from "../utils/signUpFormFields";
import { validation } from "../utils/validation";

export const signUpHandler = async ({ formData, dispatch, navigate }) => {
  const valid = validation(signUpFormFields);
  if (valid) {
    const config = {
      url: "users/SignUp",
      data: formData,
      method: "POST",
    };
    const response = await dispatch(api({ name: "signUp", config }));

    const { statusCode } = response?.payload?.data ?? {};

    if (statusCode === SUCCESS_CODE) {
      navigate("/sign-in");
      dispatch(
        showToast({
          type: "info",
          message: "Please, Check you mail box for verification!",
        })
      );
    }
  }
};
