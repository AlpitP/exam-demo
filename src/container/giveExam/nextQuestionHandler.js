import {
  clearForm,
  onChange,
  removeError,
  setError,
} from "../../redux/slices/formSlice";
import { addAnswer } from "../../redux/slices/studentSlice";

export const nextQuestionHandler = ({
  dispatch,
  formData,
  setIndex,
  index,
  exam,
  examData,
}) => {
  if (formData.answer) {
    dispatch(
      addAnswer({
        data: {
          question: formData?.question,
          answer: formData?.answer,
        },
        index: index,
      })
    );
    dispatch(clearForm());
    dispatch(
      onChange({
        data: {
          ans1: exam?.[index + 1]?.options?.[0],
          ans2: exam?.[index + 1]?.options?.[1],
          ans3: exam?.[index + 1]?.options?.[2],
          ans4: exam?.[index + 1]?.options?.[3],
          question: exam?.[index + 1]?.question,
          answer: examData?.questions?.[index + 1]?.answer,
        },
      })
    );
    setIndex((index) => (index += 1));
    dispatch(removeError({ name: "error" }));
  } else {
    dispatch(setError({ name: "error", error: "Please Select Ans." }));
  }
};
