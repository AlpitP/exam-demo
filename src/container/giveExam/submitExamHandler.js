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
    const config = {
      url: `student/giveExam${search}`,
      data: store.getState().student.exam.questions,
      method: POST,
    };
    const response = await dispatch(api({ name: "giveExam", config }));
    const { statusCode } = response?.payload?.data ?? {};
    statusCode === SUCCESS_CODE && navigate("/student/exams");
    dispatch(removeError({ name: "error" }));
  } else {
    dispatch(setError({ name: "error", error: "Please Select Ans." }));
  }
};
