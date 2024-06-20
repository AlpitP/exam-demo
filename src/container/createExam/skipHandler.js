import { toast } from "react-toastify";
import { clearForm } from "../../redux/slices/formSlice";
import { currentQuestionHandler } from "../createExamHandlers";

export const skipHandler = ({
  setIndex,
  dispatch,
  setCurrentQuestion,
  index,
  data,
  subjectName,
  navigate,
  type,
  search,
}) => {
  if (data.subjectName) {
    currentQuestionHandler({
      setCurrentQuestion,
      index,
      data,
      type: "skip;",
      subjectName,
    });
    setIndex((index) => (index += 1));
    dispatch(clearForm());
    type === "editExam"
      ? navigate(`/teacher/examDetail/question${index + 1}${search}`)
      : navigate(`/teacher/create-exam/question${index + 1}`);
  } else {
    toast.error("You can not skip First question.");
  }
};
