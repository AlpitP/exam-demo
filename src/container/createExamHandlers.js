import { Navigate } from "react-router-dom";
import { SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import {
  addExam,
  addQuestion,
  editQuestion,
} from "../redux/slices/teacherSlice";
import { createExamFormFields } from "../utils/createExamFormFields";
import { allFormFieldValidation } from "../utils/fullFormValidation";
import { clearForm } from "../redux/slices/formSlice";
import { toast } from "react-toastify";

export const submitHandler = async ({
  index,
  formData,
  dispatch,
  examData,
  notes,
}) => {
  const valid = allFormFieldValidation(createExamFormFields(index));
  if (valid && formData.ans !== "") {
    dispatch(
      addQuestion({
        question: examData.questions[0],
        note: notes,
      })
    );
    const config = {
      url: "users/Login",
      data: formData,
      method: "POST",
    };
    const response = await dispatch(api({ name: "signIn", config }));
    const { statusCode } = response?.payload?.data ?? {};

    statusCode === SUCCESS_CODE && Navigate(`/view-exam`);
  }
};

export const nextHandler = ({
  index,
  formData,
  edit,
  dispatch,
  examData,
  notes,
  currentQue,
  setIndex,
  setEdit,
  setCurrentQuestion,
  data,
  currentQuestionHandler,
}) => {
  const valid = allFormFieldValidation(createExamFormFields(index));
  if (valid && formData?.ans !== "") {
    edit
      ? dispatch(
          editQuestion({
            question: examData?.questions?.[0],
            note: notes,
            currentQue: currentQue,
          })
        )
      : index === 0
      ? dispatch(addExam(examData))
      : dispatch(
          addQuestion({
            question: examData?.questions?.[0],
            note: notes,
          })
        );
    setIndex((index) => index + 1);
    dispatch(clearForm());
    currentQuestionHandler({
      setCurrentQuestion,
      index,
      data,
      type: "next",
    });
    setEdit(false);
  } else {
    toast.error("Please Select Ans");
  }
};

export const previousHandler = ({
  setEdit,
  setIndex,
  currentQuestionHandler,
  setCurrentQuestion,
  index,
  data,
}) => {
  setEdit(true);
  setIndex((index) => index - 1);
  currentQuestionHandler({
    setCurrentQuestion,
    index,
    data,
    type: "prev",
  });
  // dispatch(onChange(currentQuestion));
};

export const skipHandler = ({ setIndex, dispatch }) => {
  setIndex((index) => (index += 1));
  dispatch(clearForm());
};
