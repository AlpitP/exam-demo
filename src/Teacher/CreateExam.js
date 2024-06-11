import React, { useState } from "react";
import Sidebar from "../Student/Sidebar";
import Form from "../shared/Form";
import { createExamFormFields } from "../utils/createExamFormFields";
import CustomButton from "../shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "../redux/slices/formSlice";
import { addExam, addQuestion } from "../redux/slices/teacherSlice";

const CreateExam = () => {
  const [index, setIndex] = useState(0);
  const { formData } = useSelector((state) => state.formData);
  const dispatch = useDispatch();
  const { subjectName, notes, question, ans1, ans2, ans3, ans4 } = formData;

  const examData = {
    subjectName: subjectName,
    questions: [{ question: question, options: [ans1, ans2, ans3, ans4] }],
    notes: [notes],
  };

  const submitHandler = () => {
    dispatch(addQuestion(examData.questions[0]));
  };

  const nextHandler = () => {
    index === 0
      ? dispatch(addExam(examData))
      : dispatch(addQuestion(examData.questions[0]));
    setIndex((index) => (index += 1));
    dispatch(clearForm());
  };

  const previousHandler = () => {
    setIndex((index) => (index -= 1));
    dispatch(clearForm());
  };

  return (
    <div>
      <Sidebar />
      <h2>Create Exam</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <Form formFields={createExamFormFields(index)} id={index} />
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
          text="Next"
          onClick={nextHandler}
          disabled={index >= 14}
        />
      </form>
    </div>
  );
};

export default CreateExam;
