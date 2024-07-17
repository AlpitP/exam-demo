import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageNotFound from "../components/PageNotFound";
import {
  FIRST_QUESTION,
  POST,
  PUT,
  SUCCESS_CODE,
  TOTAL_OPTIONS,
  TOTAL_QUESTIONS_CREATE_EXAM,
} from "../constants";
import { setFormData } from "../container/setFormData";
import { createExamFormFields } from "../description/createExamFormFields";
import api from "../redux/actions/apiAction";
import { clearForm, onChange, removeError } from "../redux/slices/formSlice";
import {
  setCurrentQuestionFormData,
  setQuestion,
} from "../redux/slices/teacherSlice";
import store from "../redux/store/store";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import Loader from "../shared/Loader";
import useClearFormOnUnMount from "../shared/useClearFormOnUnmount";
import { objectKeys } from "../utils/javascript";
import { validation } from "../utils/validation";

const CreateExam = ({ type }) => {
  const { id } = useParams();
  const [index, setIndex] = useState(+id);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { loading } = useSelector((state) => state.api);
  const { formData } = useSelector((state) => state.formData);
  const { examData: data, currentQuestion } = useSelector(
    (state) => state.teacher
  );
  const dispatch = useDispatch();
  const { subjectName, notes, question, answer } = formData;

  const options = [];
  for (let i = 0; i < TOTAL_OPTIONS; i++) {
    const option = `ans${i + 1}`;
    formData?.[option] && options.push(formData?.[option]);
  }

  useClearFormOnUnMount();

  useEffect(() => {
    dispatch(
      onChange({
        data: currentQuestion?.question?.length
          ? objectKeys(formData).length
            ? formData
            : currentQuestion
          : data?.subjectName
          ? { subjectName: data?.subjectName }
          : {},
      })
    );
    formData?.answer && dispatch(removeError({ name: "error" }));
  }, [currentQuestion]);

  useEffect(() => {
    const options = data?.questions?.[index - 1]?.options.reduce(
      (acc, ele, index) => {
        acc[`ans${index + 1}`] = ele;
        return acc;
      },
      {}
    );
    dispatch(
      setCurrentQuestionFormData({
        data: {
          subjectName: data?.subjectName,
          question: data?.questions?.[index - 1]?.question,
          answer: data?.questions?.[index - 1]?.answer,
          notes: data?.notes?.[index - 1],
          ...options,
        },
      })
    );
    dispatch(clearForm());
  }, [index, data, dispatch]);

  const examData = {
    subjectName,
    questions: [{ question, options, answer }],
    notes: [],
  };

  const previousHandler = () => {
    setIndex((index) => index - 1);
    type === "editExam"
      ? navigate(`/teacher/edit-exam/${index - 1}${search}`)
      : type === "viewExam"
      ? navigate(`/teacher/view-exam/${index - 1}${search}`)
      : navigate(`/teacher/create-exam/${index - 1}`);
  };

  const submitHandler = async () => {
    setFormData({ dispatch, formData, data, index });
    const valid = validation(createExamFormFields(index - 1));
    const filter = data.questions.filter((ele) => ele);
    if (
      valid &&
      formData.answer &&
      filter.length >= TOTAL_QUESTIONS_CREATE_EXAM - 1
    ) {
      if (filter.length < TOTAL_QUESTIONS_CREATE_EXAM) {
        dispatch(
          setQuestion({
            subjectName: data?.subjectName,
            question: examData?.questions?.[0],
            note: notes,
            currentQue: index,
          })
        );
      }
      const config = {
        url: "dashboard/Teachers/Exam",
        data: store.getState().teacher.examData,
        method: POST,
      };
      const response = await dispatch(api({ name: "createExam", config }));
      const { statusCode, message } = response?.payload?.data ?? {};
      statusCode === SUCCESS_CODE && navigate(`/teacher/view-exams`);
      toast.success(message);
    } else if (valid && !formData.answer) {
      toast.error("Please Select Ans.");
    } else {
      toast.error(`Please Fill All Questions.`);
    }
  };

  const skipHandler = () => {
    if (data.subjectName) {
      setIndex((index) => index + 1);
      dispatch(clearForm());
      type === "editExam"
        ? navigate(`/teacher/edit-exam/${index + 1}${search}`)
        : navigate(`/teacher/create-exam/${index + 1}`);
    } else {
      toast.error("You can not skip First question.");
    }
  };

  const updateHandler = async () => {
    const valid = validation(createExamFormFields(index - 1));
    const filter = data.questions.filter((ele) => ele);
    if (
      valid &&
      formData.answer &&
      filter.length === TOTAL_QUESTIONS_CREATE_EXAM
    ) {
      dispatch(
        setQuestion({
          subjectName: examData?.subjectName,
          question: examData?.questions?.[0],
          note: notes,
          currentQue: index,
        })
      );
      const config = {
        url: `dashboard/Teachers/editExam${search}`,
        data: store.getState().teacher.examData,
        method: PUT,
      };
      const response = await dispatch(api({ name: "updateExam", config }));
      const { statusCode, message } = response?.payload?.data ?? {};
      statusCode === SUCCESS_CODE && navigate(`/teacher/view-exams`);
      toast.success(message);
    } else {
      toast.error(`Please Fill All Questions.`);
    }
  };

  const nextHandler = () => {
    setFormData({ dispatch, formData, data, index });
    const valid = validation(createExamFormFields(index - 1));
    if (valid && formData.answer) {
      dispatch(
        setQuestion({
          subjectName: subjectName,
          question: examData?.questions?.[0],
          note: notes,
          currentQue: index,
        })
      );
      setIndex((index) => index + 1);
      dispatch(onChange({ data: { subjectName: examData?.subjectName } }));
      type === "editExam"
        ? navigate(`/teacher/edit-exam/${index + 1}${search}`)
        : type === "viewExam"
        ? navigate(`/teacher/view-exam/${index + 1}${search}`)
        : navigate(`/teacher/create-exam/${index + 1}`);
    } else if (valid && !formData.answer) {
      toast.error("Please Select Ans");
    }
  };

  if (+id < FIRST_QUESTION || +id > TOTAL_QUESTIONS_CREATE_EXAM) {
    return <PageNotFound />;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {type === "editExam" ? "Edit" : type === "viewExam" ? "View" : "Create"}
        Exam
      </h1>
      {loading.editExam ? (
        <Loader loading={loading.editExam} />
      ) : (
        <div style={{ marginLeft: "40%" }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Form
              formFields={createExamFormFields(index - 1)}
              disable={type === "viewExam"}
            />
            <CustomButton
              value="Previous"
              onClick={previousHandler}
              disabled={
                index === FIRST_QUESTION ||
                loading.updateExam ||
                loading.createExam
              }
            />
            {console.log(type)}
            {type !== "viewExam" && (
              <>
                <CustomButton
                  value={
                    type === "editExam"
                      ? loading.updateExam
                        ? "Updating.."
                        : "Update"
                      : loading.createExam
                      ? "Submitting.."
                      : "Submit"
                  }
                  onClick={type === "editExam" ? updateHandler : submitHandler}
                  disabled={
                    (type !== "editExam" &&
                      index !== TOTAL_QUESTIONS_CREATE_EXAM) ||
                    loading.updateExam ||
                    loading.createExam
                  }
                />
                <CustomButton
                  value="Skip"
                  onClick={skipHandler}
                  disabled={
                    index === TOTAL_QUESTIONS_CREATE_EXAM ||
                    loading.updateExam ||
                    loading.createExam ||
                    (type !== "editExam" && index === FIRST_QUESTION)
                  }
                />
              </>
            )}
            <CustomButton
              value="Next"
              onClick={nextHandler}
              disabled={
                index >= TOTAL_QUESTIONS_CREATE_EXAM || loading.updateExam
              }
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateExam;
