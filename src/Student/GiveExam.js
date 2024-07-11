import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FIRST_QUESTION,
  GET,
  TOTAL_QUESTIONS_GIVE_EXAM,
  POST,
  SUCCESS_CODE,
} from "../constants";
import api from "../redux/actions/apiAction";
import { onChange, removeError, setError } from "../redux/slices/formSlice";
import { setQuestion, setExam, clearExam } from "../redux/slices/studentSlice";
import store from "../redux/store/store";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import Loader from "../shared/Loader";
import { giveExamFormFields } from "../description/giveExamFormFields";
import PageNotFound from "../components/PageNotFound";

const GiveExam = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exam } = useSelector((state) => state.api.data);
  const { exam: examLoader, giveExam } = useSelector(
    (state) => state.api.loading
  );
  const [index, setIndex] = useState(+id);
  const { formData, error } = useSelector((state) => state.formData);
  const { exam: examData } = useSelector((state) => state.student);

  useEffect(() => {
    const options = examData.exam?.[index - 1]?.options.reduce(
      (acc, ele, index) => {
        acc[`ans${index + 1}`] = ele;
        return acc;
      },
      {}
    );
    dispatch(
      onChange({
        data: {
          question: examData.exam?.[index - 1]?.question,
          answer: examData?.questions?.[index - 1]?.answer,
          ...options,
        },
      })
    );
  }, [examData, index, dispatch]);

  useEffect(() => {
    dispatch(setExam({ data: exam }));
    if (formData?.answer) {
      dispatch(removeError({ name: "error" }));
    }
  }, [formData?.answer, exam]);

  const fetchExam = async () => {
    const config = {
      url: `student/examPaper${search}`,
      method: GET,
    };
    const response = await dispatch(api({ name: "exam", config }));
    const { statusCode } = response?.payload?.data ?? {};
    statusCode === 500 && navigate("/student/exams");
  };

  useEffect(() => {
    fetchExam();
    return () => dispatch(clearExam());
  }, []);

  const currentQuestion = () => {
    dispatch(
      setQuestion({
        data: {
          question: formData?.question,
          answer: formData?.answer,
        },
        index: index,
      })
    );
  };

  const submitExamHandler = async () => {
    if (
      formData.answer &&
      examData.questions.length === TOTAL_QUESTIONS_GIVE_EXAM - 1
    ) {
      currentQuestion();
      const config = {
        url: `student/giveExam${search}`,
        data: store.getState().student.exam.questions,
        method: POST,
      };
      const response = await dispatch(api({ name: "giveExam", config }));
      const { statusCode, message } = response?.payload?.data ?? {};
      statusCode === SUCCESS_CODE && navigate("/student/exams");
      toast.success(message);
      dispatch(removeError({ name: "error" }));
    } else if (!formData?.answer) {
      dispatch(setError({ name: "error", error: "Please Select Ans." }));
    } else {
      toast.error("Please Attempt all questions.");
    }
  };

  const nextQuestionHandler = () => {
    if (formData.answer) {
      currentQuestion();
      setIndex((index) => index + 1);
      dispatch(removeError({ name: "error" }));
      navigate(`/student/give-exam/${index + 1}${search}`);
    } else {
      dispatch(setError({ name: "error", error: "Please Select Ans." }));
    }
  };
  const previousQuestionHandler = () => {
    setIndex((index) => index - 1);
    dispatch(removeError({ name: "error" }));
    navigate(`/student/give-exam/${index - 1}${search}`);
  };
  const skipQuestionHandler = () => {
    setIndex((index) => index + 1);
    dispatch(removeError({ name: "error" }));
    navigate(`/student/give-exam/${index + 1}${search}`);
  };

  if (+id < FIRST_QUESTION || +id > TOTAL_QUESTIONS_GIVE_EXAM) {
    return <PageNotFound />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Exam</h1>
      {examLoader ? (
        <Loader loading={examLoader} />
      ) : (
        <>
          <h3>
            Question {index} : {exam?.[index - 1]?.question}
          </h3>
          <Form formFields={giveExamFormFields({ index, examData })} />
          {error?.error && (
            <p style={{ color: "red", fontSize: 14 }}>Please Select Ans.</p>
          )}

          <CustomButton
            value="Previous"
            onClick={previousQuestionHandler}
            disabled={index === FIRST_QUESTION || giveExam}
          />

          <CustomButton
            value={giveExam ? "Submitting..." : " Submit"}
            onClick={submitExamHandler}
            disabled={index !== TOTAL_QUESTIONS_GIVE_EXAM || giveExam}
          />

          <CustomButton
            value="Skip"
            onClick={skipQuestionHandler}
            disabled={index === TOTAL_QUESTIONS_GIVE_EXAM}
          />

          <CustomButton
            value="Next"
            onClick={nextQuestionHandler}
            disabled={index === TOTAL_QUESTIONS_GIVE_EXAM}
          />
        </>
      )}
    </div>
  );
};

export default GiveExam;
