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
  navigate,
  search,
}) => {
  console.log("exam", exam);
  console.log("examData", examData);
  console.log("index", index);
  if (formData.answer) {
    // dispatch(
    //   onChange({
    //     data: {
    //       ans1: exam?.[index + 1]?.options?.[0],
    //       ans2: exam?.[index + 1]?.options?.[1],
    //       ans3: exam?.[index + 1]?.options?.[2],
    //       ans4: exam?.[index + 1]?.options?.[3],
    //       question: exam?.[index + 1]?.question,
    //       answer: examData?.questions?.[index + 1]?.answer,
    //     },
    //   })
    // );
    dispatch(
      addAnswer({
        data: {
          question: formData?.question,
          answer: formData?.answer,
        },
        index: index,
      })
    );
    // dispatch(clearForm());
    setIndex((index) => (index += 1));
    dispatch(removeError({ name: "error" }));
    navigate(`/student/give-exam/question${index + 1}${search}`);
  } else {
    dispatch(setError({ name: "error", error: "Please Select Ans." }));
  }
};
