import { toast } from "react-toastify";
import { clearForm } from "../../redux/slices/formSlice";
import { addQuestion } from "../../redux/slices/teacherSlice";
import { createExamFormFields } from "../../utils/createExamFormFields";
import { allFormFieldValidation } from "../../utils/fullFormValidation";
import { currentQuestionHandler } from "../createExamHandlers";

export const nextHandler = ({
  index,
  formData,
  dispatch,
  examData,
  notes,
  setIndex,
  setCurrentQuestion,
  data,
  subjectName,
}) => {
  const valid = allFormFieldValidation(createExamFormFields(index));
  if (valid && formData.answer) {
    dispatch(
      addQuestion({
        subjectName: subjectName,
        question: examData?.questions?.[0],
        note: notes,
        currentQue: index,
      })
    );
    setIndex((index) => index + 1);
    currentQuestionHandler({
      setCurrentQuestion,
      index,
      data,
      type: "next",
      subjectName,
    });
    dispatch(clearForm());
  } else if (!formData.answer) {
    toast.error("Please Select Ans");
  }
};
