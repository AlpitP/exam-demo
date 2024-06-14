import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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

const CreateExam = ({ type }) => {
  const [index, setIndex] = useState(0);
  // let currentQue = 0;
  const navigate = useNavigate();

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
    answer: "",
    notes: "",
  });
  const { subjectName, notes, question, answer, ans1, ans2, ans3, ans4 } =
    formData;

  useEffect(() => {
    dispatch(onChange({ data: currentQuestion }));
    return () => dispatch(clearForm());
  }, [dispatch, currentQuestion]);

  const examData = {
    subjectName: subjectName,
    questions: [
      { question: question, options: [ans1, ans2, ans3, ans4], answer: answer },
    ],
    notes: [],
  };

  // const submitHandler = async () => {
  //   const valid = allFormFieldValidation(createExamFormFields(index));
  //   if (valid && formData.answer !== "") {
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
  //   if (valid && formData.answer !== "") {
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
          index={index}
          currentQuestion={formData}
        />
        <CustomButton
          text="Previous"
          onClick={() =>
            previousHandler({
              setIndex,
              setCurrentQuestion,
              index,
              data,
              subjectName: examData.subjectName,
            })
          }
          disabled={index <= 0}
        />
        <CustomButton
          text="Submit"
          onClick={() =>
            submitHandler({
              index,
              formData,
              data,
              dispatch,
              examData,
              notes,
              navigate,
            })
          }
          disabled={index !== 14}
        />
        <CustomButton
          text="Skip"
          onClick={() =>
            skipHandler({
              setIndex,
              dispatch,
              setCurrentQuestion,
              index,
              data,
              subjectName: examData.subjectName,
            })
          }
          disabled={index === 14}
        />
        <CustomButton
          text="Next"
          onClick={() =>
            nextHandler({
              index,
              formData,
              dispatch,
              examData,
              notes,
              setIndex,
              setCurrentQuestion,
              data,
              subjectName: examData.subjectName,
            })
          }
          disabled={index >= 14}
        />
      </form>
    </div>
  );
};

export default CreateExam;
