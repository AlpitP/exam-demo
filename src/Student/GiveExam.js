import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GET } from "../constants";
import { nextQuestionHandler } from "../container/giveExam/nextQuestionHandler";
import { previousQuestionHandler } from "../container/giveExam/previousQuestionHandler";
import { skipQuestionHandler } from "../container/giveExam/skipQuestionHandler";
import { submitExamHandler } from "../container/giveExam/submitExamHandler";
import api from "../redux/actions/apiAction";
import { onChange } from "../redux/slices/formSlice";
import { addExam, clearExam } from "../redux/slices/studentSlice";
import Form from "../shared/Form";
import Loader from "../shared/Loader";
import { giveExamFormFields } from "../utils/giveExamFormFields";
import Sidebar from "./Sidebar";
import CustomButton from "../shared/Button";

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
  console.log("examData", examData);

  useEffect(() => {
    dispatch(
      onChange({
        data: {
          question: examData.exam?.[index - 1]?.question,
          ans1: examData.exam?.[index - 1]?.options?.[0],
          ans2: examData.exam?.[index - 1]?.options?.[1],
          ans3: examData.exam?.[index - 1]?.options?.[2],
          ans4: examData.exam?.[index - 1]?.options?.[3],
          answer: examData?.questions?.[index - 1]?.answer,
        },
      })
    );
  }, [examData, index]);

  useEffect(() => {
    console.log("useEffect");
    const fetchExam = async () => {
      const config = {
        url: `student/examPaper${search}`,
        method: GET,
      };
      const response = await dispatch(api({ name: "exam", config }));
      const { data, statusCode } = response?.payload?.data ?? {};

      statusCode === 500 && navigate("/student/exams");
      dispatch(addExam({ data: data }));
    };
    fetchExam();
    return () => dispatch(clearExam());
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Sidebar />
      <h1>Exam</h1>
      {examLoader ? (
        <Loader loading={examLoader} />
      ) : (
        <>
          <h3>
            Question {index} : {exam?.[index - 1]?.question}
          </h3>
          <Form
            formFields={giveExamFormFields({ index, examData })}
            index={index}
          />
          {error?.error && (
            <p style={{ color: "red", fontSize: 14 }}>Please Select Ans.</p>
          )}
          <CustomButton
            text="Previous"
            onClick={() => {
              previousQuestionHandler({
                dispatch,
                setIndex,
                exam,
                index,
                examData,
                navigate,
                search,
              });
            }}
            disabled={index === 1 || giveExam}
          />

          <CustomButton
            text={giveExam ? "Submitting..." : " Submit"}
            onClick={() => {
              submitExamHandler({
                dispatch,
                navigate,
                formData,
                index,
                search,
                examData,
              });
            }}
            disabled={index !== 7 || giveExam}
          />

          <CustomButton
            text="Skip"
            onClick={() => {
              skipQuestionHandler({
                dispatch,
                setIndex,
                exam,
                index,
                examData,
                navigate,
                search,
              });
            }}
            disabled={index === 7}
          />

          <CustomButton
            text="Next"
            onClick={() => {
              nextQuestionHandler({
                dispatch,
                formData,
                setIndex,
                index,
                exam,
                examData,
                navigate,
                search,
              });
            }}
            disabled={index === 7}
          />
        </>
      )}
    </div>
  );
};

export default GiveExam;
