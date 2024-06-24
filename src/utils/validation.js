import { DEFAULT_ERROR } from "../constants";
import { removeError, setError } from "../redux/slices/formSlice";
import store from "../redux/store/store";
import { objectKeys } from "./javascript";

export const validation = (formFields) => {
  const { formData } = store.getState("formData");
  const { formData: data } = formData;
  const { questions } = store.getState().teacher.examData;
  const dispatch = store.dispatch;
  let valid = true;
  console.log(data);

  formFields.forEach(({ name, isRequired, pattern, customValidations }) => {
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
        customValidations &&
        customValidations({
          value: data?.Password,
          compare: data?.[name],
          opt1: data.ans1,
          opt2: data.ans2,
          opt3: data.ans3,
          opt4: data.ans4,
          compareQuestionsArray: questions,
          question: data?.question,
        })
      ) {
        dispatch(
          setError({
            name,
            error:
              customValidations({
                value: data?.Password,
                compare: data?.[name],
                opt1: data.ans1,
                opt2: data.ans2,
                opt3: data.ans3,
                opt4: data.ans4,
                compareQuestionsArray: questions,
                question: data?.question,
              }) || DEFAULT_ERROR,
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
