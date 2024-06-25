import { PUT } from "../constants";
import api from "../redux/actions/apiAction";
import { setError } from "../redux/slices/formSlice";

export const submitProfile = async ({ setIsEdit, name, dispatch }) => {
  // const valid = allFormFieldValidation(editProfileFormFields);
  if (name === "") {
    dispatch(setError({ name: "name", error: "Please Enter Name." }));
  }
  if (name) {
    setIsEdit(false);
    const config = {
      url: "student/studentProfile",
      method: PUT,
      data: { name: name },
    };
    await dispatch(api({ name: "studentProfile", config }));
  }
};
