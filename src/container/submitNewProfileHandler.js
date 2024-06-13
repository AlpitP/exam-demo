import api from "../redux/actions/apiAction";
import { editProfileFormFields } from "../utils/editProfileFormFields";
import { allFormFieldValidation } from "../utils/fullForlValidation";

export const submitProfile = async ({ setIsEdit, formData, dispatch }) => {
  const valid = allFormFieldValidation(editProfileFormFields);
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
