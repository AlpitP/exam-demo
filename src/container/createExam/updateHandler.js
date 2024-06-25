import { toast } from "react-toastify";
import { PUT, SUCCESS_CODE } from "../../constants";
import api from "../../redux/actions/apiAction";
import { addQuestion } from "../../redux/slices/teacherSlice";
import store from "../../redux/store/store";
import { createExamFormFields } from "../../utils/createExamFormFields";
import { allFormFieldValidation } from "../../utils/fullFormValidation";

export const updateHandler = async ({
  index,
  formData,
  dispatch,
  examData,
  data,
  notes,
  navigate,
  search,
}) => {
  const valid = allFormFieldValidation(createExamFormFields(index - 1));
  const filter = data.questions.filter((ele) => ele !== null);
  if (valid && formData.answer !== "" && filter.length === 15) {
    dispatch(
      addQuestion({
        subjectName: examData?.subjectName,
        question: examData?.questions?.[0],
        note: notes,
        currentQue: index,
      })
    );
    const config = {
      url: `dashboard/Teachers/editExam${search}`,
      data: store.getState().teacher.examData,
      method: PUT,
    };
    const response = await dispatch(api({ name: "updateExam", config }));
    const { statusCode } = response?.payload?.data ?? {};

    statusCode === SUCCESS_CODE && navigate(`/teacher/view-exam`);
  } else {
    toast.error(`Please Fill All Questions.`);
  }
};
