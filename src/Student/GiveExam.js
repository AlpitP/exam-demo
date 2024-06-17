import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../redux/actions/apiAction";
import { clearForm, onChange, setError } from "../redux/slices/formSlice";
import { addAnswer, addExam } from "../redux/slices/studentSlice";
import Form from "../shared/Form";
import Loader from "../shared/Loader";
import Sidebar from "./Sidebar";

const GiveExam = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { exam } = useSelector((state) => state.api.data);
  const { exam: examLoader } = useSelector((state) => state.api.loading);
  const [index, setIndex] = useState(0);
  const { formData, error } = useSelector((state) => state.formData);
  const { exam: examData } = useSelector((state) => state.student);
  console.log(examData);
  useEffect(() => {
    const fetchExam = async () => {
      const config = {
        url: `student/examPaper${search}`,
        method: "GET",
      };
      const response = await dispatch(api({ name: "exam", config }));
      const { data } = response?.payload?.data;
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
    console.log("render");
  }, []);

  const giveExamFormFields = (index) => {
    return [
      {
        type: "radio",
        name: `opt1`,
        label: "A",
        id: "ans1",
        text: exam?.[index]?.options?.[0],
      },
      {
        type: "radio",
        name: `opt2`,
        label: "B",
        id: "ans2",
        text: exam?.[index]?.options?.[1],
      },
      {
        type: "radio",
        name: `opt3`,
        label: "C",
        id: "ans3",
        text: exam?.[index]?.options?.[2],
      },
      {
        type: "radio",
        name: `opt4`,
        label: "D",
        id: "ans4",
        text: exam?.[index]?.options?.[3],
      },
    ];
  };

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
          <Form formFields={giveExamFormFields(index)} index={index} />
          {error?.name && <span>Please Select Ans.</span>}
          <button
            onClick={() => {
              dispatch(
                onChange({
                  data: {
                    ans1: exam?.[index - 1]?.options?.[0],
                    ans2: exam?.[index - 1]?.options?.[1],
                    ans3: exam?.[index - 1]?.options?.[2],
                    ans4: exam?.[index - 1]?.options?.[3],
                    question: exam?.[index - 1]?.question,
                    answer: examData?.questions?.[index - 1]?.answer,
                  },
                })
              );
              setIndex((index) => (index -= 1));
            }}
            disabled={index === 0}
          >
            Previous
          </button>
          <button onClick={() => {}} disabled={index !== 6}>
            Submit
          </button>
          <button
            onClick={() => {
              if (formData.answer) {
                dispatch(
                  addAnswer({
                    data: {
                      question: formData?.question,
                      answer: formData?.answer,
                    },
                    index: index,
                  })
                );
                // dispatch(removeError({ name: "ans" }));
                dispatch(clearForm());
                dispatch(
                  onChange({
                    data: {
                      ans1: exam?.[index + 1]?.options?.[0],
                      ans2: exam?.[index + 1]?.options?.[1],
                      ans3: exam?.[index + 1]?.options?.[2],
                      ans4: exam?.[index + 1]?.options?.[3],
                      question: exam?.[index + 1]?.question,
                      answer: examData?.questions?.[index + 1]?.answer,
                    },
                  })
                );
                setIndex((index) => (index += 1));
              } else {
                alert("Please Select Ans.");
              }
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
