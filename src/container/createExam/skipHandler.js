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
  } else {
    toast.error("You can not skip First question.");
  }
};
