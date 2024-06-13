import { DEFAULT_ERROR } from "../constants";
import { removeError, setError } from "../redux/slices/formSlice";
import store from "../redux/store/store";
import { objectKeys } from "./javascript";

export const validation = (formFields) => {
  const { formData } = store.getState("formData");
  const { formData: data } = formData;
  const dispatch = store.dispatch;
  let valid = true;

  formFields.forEach(
    ({
      name,
      isRequired,
      pattern,
      customValidations,
      optionsValidations,
      id,
    }) => {
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
        } else if (
          isRequired &&
          optionsValidations &&
          optionsValidations(data.ans1, data.ans2, data.ans3, data.ans4)
        ) {
          dispatch(
            setError({
              name,
              error:
                optionsValidations(
                  data.ans1,
                  data.ans2,
                  data.ans3,
                  data.ans4
                ) || DEFAULT_ERROR,
            })
          );
          valid = false;
        } else if (
          isRequired &&
          customValidations &&
          customValidations(data.Password, data[name])
        ) {
          dispatch(
            setError({
              name,
              error:
                customValidations(data.Password, data[name]) || DEFAULT_ERROR,
            })
          );
          valid = false;
        } else {
          dispatch(removeError({ name }));
        }
      }
    }
  );
  return valid;
};
