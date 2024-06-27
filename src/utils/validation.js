import { DEFAULT_ERROR, TOTAL_OPTIONS } from "../constants";
import { removeError, setError } from "../redux/slices/formSlice";
import store from "../redux/store/store";
import { objectKeys } from "./javascript";

export const validation = (formFields) => {
  const { formData } = store.getState();
  const { formData: data } = formData;
  const { questions } = store.getState().teacher.examData;
  const dispatch = store.dispatch;
  let valid = true;
  const options = [];
  for (let i = 0; i < TOTAL_OPTIONS; i++) {
    data?.[`ans${i + 1}`] && options.push(data?.[`ans${i + 1}`]);
  }
  formFields.forEach(({ name, isRequired, pattern, customValidations }) => {
    const customValidation =
      customValidations &&
      customValidations({
        newPassword: data?.Password,
        confirmPassword: data?.[name],
        compareQuestionsArray: questions,
        question: data?.question,
        options,
      });
    if (objectKeys(data).includes(name)) {
      if (pattern && !pattern.value.test(data[name]) && data[name]) {
        dispatch(
          setError({
            name,
            error: pattern.message || DEFAULT_ERROR,
          })
        );
        valid = false;
      } else if (isRequired && !data[name]) {
        dispatch(
          setError({
            name,
            error: isRequired || DEFAULT_ERROR,
          })
        );
        valid = false;
      } else if (isRequired && customValidations && customValidation) {
        dispatch(
          setError({
            name,
            error: customValidation || DEFAULT_ERROR,
          })
        );
        valid = false;
      } else {
        dispatch(removeError({ name }));
      }
    }
  });
  return valid;
};
