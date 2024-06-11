import { setError } from "../redux/slices/formSlice";
import store from "../redux/store/store";

export const validation = (formFields) => {
  const { formData } = store.getState("formData");
  const { formData: data } = formData;
  const dispatch = store.dispatch;

  let valid = true;
  formFields.forEach(({ name, isRequired, pattern, customValidations }) => {
    if (pattern && !pattern.value.test(data[name]) && data[name]) {
      dispatch(
        setError({
          name,
          error: pattern.message,
        })
      );
      valid = false;
    } else if (isRequired) {
      if (!data[name]) {
        dispatch(
          setError({
            name,
            error: isRequired,
          })
        );
        valid = false;
      } else if (
        customValidations &&
        customValidations(data.Password, data[name])
      ) {
        dispatch(
          setError({
            name,
            error: customValidations(data.Password, data[name]),
          })
        );
        valid = false;
      }
    }
  });
  return valid;
};
