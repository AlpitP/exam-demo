import { toast } from "react-toastify";
import { SUCCESS_CODE } from "../constants";
import api from "../redux/actions/apiAction";
import { clearForm } from "../redux/slices/formSlice";
import { addQuestion } from "../redux/slices/teacherSlice";
import store from "../redux/store/store";
import { createExamFormFields } from "../utils/createExamFormFields";
import { allFormFieldValidation } from "../utils/fullFormValidation";

export const currentQuestionHandler = ({
  setCurrentQuestion,
  index,
  data,
  type,
  subjectName,
}) => {
  setCurrentQuestion((currentQuestion) => {
    return {
      ...currentQuestion,
      subjectName: subjectName ?? "",
      question:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]?.question ??
        "",
      ans1:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]
          ?.options?.[0] ?? "",
      ans2:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]
          ?.options?.[1] ?? "",
      ans3:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]
          ?.options?.[2] ?? "",
      ans4:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]
          ?.options?.[3] ?? "",
      answer:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]?.answer ??
        "",
      notes: data?.notes?.[type === "prev" ? index - 1 : index + 1] ?? "",
    };
  });
};

export const submitHandler = async ({
  index,
  formData,
  dispatch,
  examData,
  data,
  notes,
  navigate,
}) => {
  const valid = allFormFieldValidation(createExamFormFields(index));
  if (
    valid &&
    formData.answer !== "" &&
    data.questions.length === 14
    // data.questions.find((ele) => ele === null)
  ) {
    dispatch(
      addQuestion({
        subjectName: examData?.subjectName,
        question: examData?.questions?.[0],
        note: notes,
        currentQue: index,
      })
    );
    const config = {
      url: "dashboard/Teachers/Exam",
      data: store.getState().teacher.examData,
      method: "POST",
    };
    const response = await dispatch(api({ name: "createExam", config }));
    const { statusCode } = response?.payload?.data ?? {};

    statusCode === SUCCESS_CODE && navigate(`/teacher/view-exam`);
  } else if (formData.answer === "") {
    toast.error("Please Select Ans.");
  } else {
    toast.error(`Please Fill All Questions.`);
  }
};

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
  const valid = allFormFieldValidation(createExamFormFields(index));
  if (
    valid &&
    formData.answer !== "" &&
    data.questions.length === 15
    // data.questions.find((ele) => ele === null)
  ) {
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
      method: "PUT",
    };
    const response = await dispatch(api({ name: "updateExam", config }));
    const { statusCode } = response?.payload?.data ?? {};

    statusCode === SUCCESS_CODE && navigate(`/teacher/view-exam`);
  } else if (formData.answer === "") {
    toast.error("Please Select Ans.");
  } else {
    toast.error(`Please Fill All Questions.`);
  }
};

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
  if (valid && formData?.answer !== "") {
    dispatch(
      addQuestion({
        subjectName: examData?.subjectName,
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
  } else {
    toast.error("Please Select Ans");
  }
};

export const previousHandler = ({
  setIndex,
  setCurrentQuestion,
  index,
  data,
  subjectName,
}) => {
  setIndex((index) => index - 1);
  currentQuestionHandler({
    setCurrentQuestion,
    index,
    data,
    type: "prev",
    subjectName,
  });
  // dispatch(onChange(currentQuestion));
};

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
