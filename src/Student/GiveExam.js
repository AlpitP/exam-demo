import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FIRST_QUESTION, GET, LAST_QUESTION } from "../constants";
import { nextQuestionHandler } from "../container/giveExam/nextQuestionHandler";
import { submitExamHandler } from "../container/giveExam/submitExamHandler";
import api from "../redux/actions/apiAction";
import { onChange, removeError } from "../redux/slices/formSlice";
import { addExam, clearExam } from "../redux/slices/studentSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import Loader from "../shared/Loader";
import { giveExamFormFields } from "../utils/giveExamFormFields";

const GiveExam = ({ id }) => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exam } = useSelector((state) => state.api.data);
  const { exam: examLoader, giveExam } = useSelector(
    (state) => state.api.loading
  );
  const [index, setIndex] = useState(id);
  const { formData, error } = useSelector((state) => state.formData);
  const { exam: examData } = useSelector((state) => state.student);

  useEffect(() => {
    const a = examData.exam?.[index - 1]?.options.reduce((acc, ele, index) => {
      acc[`ans${index + 1}`] = ele;
      return acc;
    }, {});
    dispatch(
      onChange({
        data: {
          question: examData.exam?.[index - 1]?.question,
          answer: examData?.questions?.[index - 1]?.answer,
          ...a,
        },
      })
    );
  }, [examData, index, dispatch]);

  useEffect(() => {
    dispatch(addExam({ data: exam }));
    if (formData?.answer) {
      dispatch(removeError({ name: "error" }));
    }
  });

  useEffect(() => {
    const fetchExam = async () => {
      const config = {
        url: `student/examPaper${search}`,
        method: GET,
      };
      const response = await dispatch(api({ name: "exam", config }));
      const { statusCode } = response?.payload?.data ?? {};
      statusCode === 500 && navigate("/student/exams");
    };
    fetchExam();
    return () => dispatch(clearExam());
  }, []);

  const buttonAttributes = ({ index }) => {
    return [
      {
        value: "Previous",
        type: "button",
        onClick: () => {
          setIndex((index) => (index -= 1));
          dispatch(removeError({ name: "error" }));
          navigate(`/student/give-exam/question${index - 1}${search}`);
        },
        disable: index === FIRST_QUESTION || giveExam,
      },
      {
        value: "Skip",
        type: "button",
        typeof: "skip",
        onClick: () => {
          setIndex((index) => (index += 1));
          dispatch(removeError({ name: "error" }));
          navigate(`/student/give-exam/question${index + 1}${search}`);
        },
        disable: index === LAST_QUESTION,
      },
      {
        value: giveExam ? "Submitting..." : " Submit",
        type: "button",
        typeof: "submit",
        onClick: () =>
          submitExamHandler({
            dispatch,
            navigate,
            formData,
            index,
            search,
            examData,
          }),
        disable: index !== LAST_QUESTION || giveExam,
      },
      {
        value: "Next",
        type: "button",
        onClick: () =>
          nextQuestionHandler({
            dispatch,
            formData,
            setIndex,
            index,
            exam,
            examData,
            navigate,
            search,
          }),
        disable: index === LAST_QUESTION,
      },
    ];
  };

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

          {buttonAttributes({ index }).map(
            ({ value, onClick, disable, ...rest }, index) => {
              return (
                <CustomButton
                  onClick={onClick}
                  {...rest}
                  key={index}
                  value={value}
                  disabled={disable}
                />
              );
            }
          )}
        </>
      )}
    </div>
  );
};

export default GiveExam;
