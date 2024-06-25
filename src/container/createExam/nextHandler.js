import { toast } from "react-toastify";
import { clearForm, onChange } from "../../redux/slices/formSlice";
import { addQuestion } from "../../redux/slices/teacherSlice";
import { createExamFormFields } from "../../utils/createExamFormFields";
import { allFormFieldValidation } from "../../utils/fullFormValidation";

export const nextHandler = ({
  index,
  formData,
  dispatch,
  examData,
  notes,
  setIndex,
  subjectName,
  navigate,
  type,
  search,
}) => {
  console.log("subjectName", subjectName);
  const valid = allFormFieldValidation(createExamFormFields(index - 1));
  // dispatch(onChange({ data: { subjectName: subjectName } }));
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
    // currentQuestionHandler({
    //   setCurrentQuestion,
    //   index,
    //   data,
    //   type: "next",
    //   subjectName,
    // });
    dispatch(clearForm());
    dispatch(onChange({ data: { subjectName: examData?.subjectName } }));
    type === "editExam"
      ? navigate(`/teacher/editDetail/question${index + 1}${search}`)
      : type === "viewExam"
      ? navigate(`/teacher/viewExam/question${index + 1}${search}`)
      : navigate(`/teacher/create-exam/question${index + 1}`);
  } else if (valid && !formData.answer) {
    toast.error("Please Select Ans");
  }
};
