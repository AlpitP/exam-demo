import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { nextQuestionHandler } from "../container/giveExam/nextQuestionHandler";
import { previousQuestionHandler } from "../container/giveExam/previousQuestionHandler";
import { submitExamHandler } from "../container/giveExam/submitExamHandler";
import api from "../redux/actions/apiAction";
import { onChange } from "../redux/slices/formSlice";
import { addExam, clearExam } from "../redux/slices/studentSlice";
import Form from "../shared/Form";
import Loader from "../shared/Loader";
import Sidebar from "./Sidebar";
import { giveExamFormFields } from "../utils/giveExamFormFields";
import { GET } from "../constants";

const GiveExam = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exam } = useSelector((state) => state.api.data);
  const { exam: examLoader, giveExam } = useSelector(
    (state) => state.api.loading
  );
  const [index, setIndex] = useState(0);
  const { formData, error } = useSelector((state) => state.formData);
  const { exam: examData } = useSelector((state) => state.student);

  useEffect(() => {
    const fetchExam = async () => {
      const config = {
        url: `student/examPaper${search}`,
        method: GET,
      };
      const response = await dispatch(api({ name: "exam", config }));
      const { data } = response?.payload?.data ?? {};
      response?.error?.message === "Rejected" && navigate("/student/exams");
      dispatch(addExam({ data: data }));
      dispatch(
        onChange({
          data: {
            ans1: data?.[index]?.options?.[0],
            ans2: data?.[index]?.options?.[1],
            ans3: data?.[index]?.options?.[2],
            ans4: data?.[index]?.options?.[3],
            question: data?.[index]?.question,
          },
        })
      );
    };
    fetchExam();
    return () => dispatch(clearExam());
  }, []);

  return (
    <div>
      <Sidebar />
      <h1>Exam</h1>
      {examLoader ? (
        <Loader loading={examLoader} />
      ) : (
        <>
          <h3>
            Question {index + 1} : {exam?.[index]?.question}
          </h3>
          <Form
            formFields={giveExamFormFields({ index, exam })}
            index={index}
          />
          {error?.error && (
            <p style={{ color: "red", fontSize: 14 }}>Please Select Ans.</p>
          )}
          <button
            onClick={() => {
              previousQuestionHandler({
                dispatch,
                setIndex,
                exam,
                index,
                examData,
              });
            }}
            disabled={index === 0 || giveExam}
          >
            Previous
          </button>
          <button
            onClick={() => {
              submitExamHandler({
                dispatch,
                navigate,
                formData,
                index,
                search,
              });
            }}
            disabled={index !== 6 || giveExam}
          >
            {giveExam ? "Submitting..." : " Submit"}
          </button>
          <button
            onClick={() => {
              nextQuestionHandler({
                dispatch,
                formData,
                setIndex,
                index,
                exam,
                examData,
              });
            }}
            disabled={index === 6}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default GiveExam;
