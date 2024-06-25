import { toast } from "react-toastify";
import { POST, SUCCESS_CODE } from "../../constants";
import api from "../../redux/actions/apiAction";
import { addQuestion } from "../../redux/slices/teacherSlice";
import { createExamFormFields } from "../../utils/createExamFormFields";
import { allFormFieldValidation } from "../../utils/fullFormValidation";
import store from "../../redux/store/store";

export const submitHandler = async ({
  index,
  formData,
  dispatch,
  examData,
  data,
  notes,
  navigate,
}) => {
  const valid = allFormFieldValidation(createExamFormFields(index - 1));
  const filter = data.questions.filter((ele) => ele !== null);
  if (valid && formData.answer && filter.length === 14) {
    dispatch(
      addQuestion({
        subjectName: data?.subjectName,
        question: examData?.questions?.[0],
        note: notes,
        currentQue: index,
      })
    );
    const config = {
      url: "dashboard/Teachers/Exam",
      data: store.getState().teacher.examData,
      method: POST,
    };
    const response = await dispatch(api({ name: "createExam", config }));
    const { statusCode } = response?.payload?.data ?? {};

    statusCode === SUCCESS_CODE && navigate(`/teacher/view-exam`);
  } else if (valid && !formData.answer) {
    toast.error("Please Select Ans.");
  } else {
    toast.error(`Please Fill All Questions.`);
  }
};
