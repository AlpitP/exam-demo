import { SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { allFormFieldValidation } from "../utils/fullForlValidation";
import { signInFormFields } from "../utils/signInFormFIelds";

export const signInHandler = async ({ formData, dispatch, navigate }) => {
  const valid = allFormFieldValidation(signInFormFields);
  if (valid) {
    const config = {
      url: "users/Login",
      data: formData,
      method: "POST",
    };
    const response = await dispatch(api({ name: "signIn", config }));
    const { data, statusCode } = response?.payload?.data ?? {};

    statusCode === SUCCESS_CODE && navigate(`/${data?.role}`);
  }
};
