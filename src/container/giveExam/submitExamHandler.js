import { toast } from "react-toastify";
import { POST, SUCCESS_CODE } from "../../constants";
import api from "../../redux/actions/apiAction";
import { removeError, setError } from "../../redux/slices/formSlice";
import { addAnswer } from "../../redux/slices/studentSlice";
import store from "../../redux/store/store";

export const submitExamHandler = async ({
  dispatch,
  navigate,
  formData,
  index,
  search,
  examData,
}) => {
  if (formData.answer && examData.questions.length === 6) {
    dispatch(
      addAnswer({
        data: {
          question: formData?.question,
          answer: formData?.answer,
        },
        index: index,
      })
    );
    const config = {
      url: `student/giveExam${search}`,
      data: store.getState().student.exam.questions,
      method: POST,
    };
    const response = await dispatch(api({ name: "giveExam", config }));
    const { statusCode } = response?.payload?.data ?? {};
    statusCode === SUCCESS_CODE && navigate("/student/exams");
    dispatch(removeError({ name: "error" }));
  } else if (!formData?.answer) {
    dispatch(setError({ name: "error", error: "Please Select Ans." }));
  } else {
    toast.error("Please Attempt all questions.");
  }
};
