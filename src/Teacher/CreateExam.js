import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Student/Sidebar";
import { clearForm } from "../redux/slices/formSlice";
import { addExam, addQuestion } from "../redux/slices/teacherSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { createExamFormFields } from "../utils/createExamFormFields";

const CreateExam = () => {
  const [index, setIndex] = useState(0);
  const { formData } = useSelector((state) => state.formData);
  const dispatch = useDispatch();
  const { subjectName, notes, question, ans, ans1, ans2, ans3, ans4 } =
    formData;

  const examData = {
    subjectName: subjectName,
    questions: [
      { question: question, options: [ans1, ans2, ans3, ans4], ans: ans },
    ],
    notes: [notes],
  };

  const submitHandler = () => {
    dispatch(
      addQuestion({
        subjectName: subjectName,
        question: examData.questions[0],
        note: notes,
      })
    );
  };

  const nextHandler = () => {
    index === 0
      ? dispatch(addExam(examData))
      : dispatch(
          addQuestion({
            subjectName: subjectName,
            question: examData.questions[0],
            note: notes,
          })
        );
    setIndex((index) => (index += 1));
    dispatch(clearForm());
  };

  const previousHandler = () => {
    setIndex((index) => (index -= 1));
    dispatch(clearForm());
  };
  const skipHandler = () => {
    setIndex((index) => (index += 1));
  };

  return (
    <div>
      <Sidebar />
      <h2>Create Exam</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <Form formFields={createExamFormFields(index)} index={index} />
        <CustomButton
          text="Previous"
          onClick={previousHandler}
          disabled={index <= 0}
        />
        <CustomButton
          text="Submit"
          onClick={submitHandler}
          disabled={index !== 14}
        />
        <CustomButton
          text="Skip"
          onClick={skipHandler}
          disabled={index === 14}
        />
        <CustomButton
          text="Next"
          onClick={nextHandler}
          disabled={index >= 14}
        />
      </form>
    </div>
  );
};

export default CreateExam;
