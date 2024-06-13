import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Student/Sidebar";
import {
  nextHandler,
  previousHandler,
  skipHandler,
  submitHandler,
} from "../container/createExamHandlers";
import { clearForm, onChange } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { createExamFormFields } from "../utils/createExamFormFields";

const currentQuestionHandler = ({ setCurrentQuestion, index, data, type }) => {
  setCurrentQuestion((currentQuestion) => {
    return {
      ...currentQuestion,
      subjectName: data?.subjectName ?? "",
      question:
        data?.questions?.[type === "prev" ? index - 1 : +1]?.question ?? "",
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
      ans:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]?.ans ?? "",
      notes: data?.notes?.[type === "prev" ? index - 1 : index + 1] ?? "",
    };
  });
};

const CreateExam = () => {
  const [index, setIndex] = useState(0);
  const [edit, setEdit] = useState(false);
  let currentQue = index;
  const { formData } = useSelector((state) => state.formData);
  const { examData: data } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState({
    subjectName: "",
    question: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    ans: "",
    notes: "",
  });

  useEffect(() => {
    dispatch(onChange({ data: currentQuestion }));
    return () => dispatch(clearForm());
  }, [dispatch, currentQuestion]);

  const { subjectName, notes, question, ans, ans1, ans2, ans3, ans4 } =
    formData;

  const examData = {
    subjectName: subjectName,
    questions: [
      { question: question, options: [ans1, ans2, ans3, ans4], ans: ans },
    ],
    notes: [notes],
  };
  console.log(formData);
  // const submitHandler = async () => {
  //   const valid = allFormFieldValidation(createExamFormFields(index));
  //   if (valid && formData.ans !== "") {
  //     dispatch(
  //       addQuestion({
  //         question: examData.questions[0],
  //         note: notes,
  //       })
  //     );
  //     const config = {
  //       url: "users/Login",
  //       data: formData,
  //       method: "POST",
  //     };
  //     const response = await dispatch(api({ name: "signIn", config }));
  //     const { statusCode } = response?.payload?.data ?? {};

  //     statusCode === SUCCESS_CODE && navigate(`/view-exam`);
  //   }
  // };

  // const nextHandler = () => {
  //   const valid = allFormFieldValidation(createExamFormFields(index));
  //   if (valid && formData.ans !== "") {
  //     edit
  //       ? dispatch(
  //           editQuestion({
  //             question: examData.questions[0],
  //             note: notes,
  //             currentQue: currentQue,
  //           })
  //         )
  //       : index === 0
  //       ? dispatch(addExam(examData))
  //       : dispatch(
  //           addQuestion({
  //             question: examData.questions[0],
  //             note: notes,
  //           })
  //         );
  //     setIndex((index) => index + 1);
  //     dispatch(clearForm());
  //     currentQuestionHandler({
  //       setCurrentQuestion,
  //       index,
  //       data,
  //       type: "next",
  //     });
  //     setEdit(false);
  //   } else {
  //     toast.error("Please Select Ans");
  //   }
  // };

  // const previousHandler = () => {
  //   setEdit(true);
  //   setIndex((index) => index - 1);
  //   currentQuestionHandler({
  //     setCurrentQuestion,
  //     index,
  //     data,
  //     type: "prev",
  //   });
  //   // dispatch(onChange(currentQuestion));
  // };

  // const skipHandler = () => {
  //   setIndex((index) => (index += 1));
  //   dispatch(clearForm());
  // };

  return (
    <div>
      <Sidebar />
      <h2>Create Exam</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <Form
          formFields={createExamFormFields(index)}
          index={currentQue}
          currentQuestion={currentQuestion}
        />
        <CustomButton
          text="Previous"
          onClick={() =>
            previousHandler({
              setEdit,
              setIndex,
              currentQuestionHandler,
              setCurrentQuestion,
              index,
              data,
            })
          }
          disabled={index <= 0}
        />
        <CustomButton
          text="Submit"
          onClick={() =>
            submitHandler({ index, formData, dispatch, examData, notes })
          }
          disabled={index !== 14}
        />
        <CustomButton
          text="Skip"
          onClick={() => skipHandler({ setIndex, dispatch })}
          disabled={index === 14}
        />
        <CustomButton
          text="Next"
          onClick={() =>
            nextHandler({
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
            })
          }
          disabled={index >= 14}
        />
      </form>
    </div>
  );
};

export default CreateExam;
