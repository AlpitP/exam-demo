import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Student/Sidebar";
import { nextHandler } from "../container/createExam/nextHandler";
import { previousHandler } from "../container/createExam/previousHandler";
import { skipHandler } from "../container/createExam/skipHandler";
import { submitHandler } from "../container/createExam/submitHandler";
import { updateHandler } from "../container/createExam/updateHandler";
import { clearForm } from "../redux/slices/formSlice";
import { currentQuestionFormData } from "../redux/slices/teacherSlice";
import store from "../redux/store/store";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import Loader from "../shared/Loader";
import { createExamFormFields } from "../utils/createExamFormFields";

const initialState = {
  subjectName: "",
  question: "",
  ans1: "",
  ans2: "",
  ans3: "",
  ans4: "",
  answer: "",
  notes: "",
};

const CreateExam = ({ type, exam, id }) => {
  const [index, setIndex] = useState(id);
  const { loading } = useSelector((state) => state.api);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { formData } = useSelector((state) => state.formData);
  const { examData: data } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(initialState);

  const { subjectName, notes, question, answer, ans1, ans2, ans3, ans4 } =
    formData;
  console.log("exam", exam);
  useEffect(() => {
    dispatch(
      currentQuestionFormData({
        data: exam
          ? index === 1
            ? exam
            : currentQuestion
          : {
              subjectName: data?.subjectName,
              question: data?.questions?.[index - 1]?.question,
              ans1: data?.questions?.[index - 1]?.options?.[0],
              ans2: data?.questions?.[index - 1]?.options?.[1],
              ans3: data?.questions?.[index - 1]?.options?.[2],
              ans4: data?.questions?.[index - 1]?.options?.[3],
              answer: data?.questions?.[index - 1]?.answer,
              notes: data?.notes?.[index - 1],
            },
      })
    );
    dispatch(clearForm());
  }, [index, data]);

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
      <h1 style={{ textAlign: "center" }}>
        {type === "editExam" ? "Edit" : "Create"} Exam
      </h1>
      {loading.editExam ? (
        <Loader loading={loading.editExam} />
      ) : (
        <div style={{ marginLeft: "40%" }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Form
              formFields={createExamFormFields(index - 1)}
              index={index}
              currentQuestion={store.getState()?.teacher?.currentQuestion}
              type={type}
            />
            <CustomButton
              text="Previous"
              onClick={() =>
                previousHandler({
                  setIndex,
                  setCurrentQuestion,
                  index,
                  data,
                  subjectName: data?.subjectName,
                  navigate,
                  type,
                  search,
                })
              }
              disabled={index <= 1 || loading.updateExam || loading.createExam}
            />
            <CustomButton
              text={
                type === "editExam"
                  ? loading.updateExam
                    ? "Updating.."
                    : "Update"
                  : loading.createExam
                  ? "Submitting.."
                  : "Submit"
              }
              onClick={() => {
                type === "editExam"
                  ? updateHandler({
                      index,
                      formData,
                      data,
                      dispatch,
                      examData,
                      notes,
                      navigate,
                      search,
                    })
                  : submitHandler({
                      index,
                      formData,
                      data,
                      dispatch,
                      examData,
                      notes,
                      navigate,
                    });
              }}
              disabled={
                (type !== "editExam" && index !== 15) ||
                loading.updateExam ||
                loading.createExam
              }
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
                  subjectName: data?.subjectName ?? examData?.subjectName,
                  navigate,
                  type,
                  search,
                })
              }
              disabled={index === 15 || loading.updateExam}
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
                  subjectName:
                    index === 1 ? examData?.subjectName : data.subjectName,
                  navigate,
                  type,
                  search,
                })
              }
              disabled={index >= 15 || loading.updateExam}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateExam;
