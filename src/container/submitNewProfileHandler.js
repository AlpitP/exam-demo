import api from "../redux/actions/apiAction";
import { editProfileFormFields } from "../utils/editProfileFormFields";
import { fullFormValidation } from "../utils/fullForlValidation";

export const submitProfile = async ({ setIsEdit, formData, dispatch }) => {
  const valid = fullFormValidation(editProfileFormFields);
  if (valid) {
    setIsEdit(false);
    const config = {
      url: "student/studentProfile",
      method: "put",
      data: formData,
    };
    await dispatch(api({ name: "editedProfile", config }));
  }
};
