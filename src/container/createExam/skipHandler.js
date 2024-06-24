import { toast } from "react-toastify";
import { clearForm } from "../../redux/slices/formSlice";

export const skipHandler = ({
  setIndex,
  dispatch,
  index,
  data,
  navigate,
  type,
  search,
}) => {
  if (data.subjectName) {
    // currentQuestionHandler({
    //   setCurrentQuestion,
    //   index,
    //   data,
    //   type: "skip;",
    //   subjectName,
    // });
    setIndex((index) => (index += 1));
    dispatch(clearForm());
    type === "editExam"
      ? navigate(`/teacher/editDetail/question${index + 1}${search}`)
      : navigate(`/teacher/create-exam/question${index + 1}`);
  } else {
    toast.error("You can not skip First question.");
  }
};
