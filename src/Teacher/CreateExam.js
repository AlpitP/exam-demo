import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CREATE_EXAM_LAST_QUESTION,
  FIRST_QUESTION,
  POST,
  PUT,
  SUCCESS_CODE,
} from "../constants";
import api from "../redux/actions/apiAction";
import { clearForm, onChange, removeError } from "../redux/slices/formSlice";
import {
  setQuestion,
  setCurrentQuestionFormData,
} from "../redux/slices/teacherSlice";
import store from "../redux/store/store";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import Loader from "../shared/Loader";
import { createExamFormFields } from "../discription/createExamFormFields";
import { objectKeys } from "../utils/javascript";
import { validation } from "../utils/validation";
import { setFormData } from "../container/setFormData";

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

  const { subjectName, notes, question, answer, ans1, ans2, ans3, ans4 } =
    formData;

  useEffect(() => {
    if (currentQuestion?.question?.length > 0) {
      dispatch(
        onChange({
          data: objectKeys(formData).length > 0 ? formData : currentQuestion,
        })
      );
    } else {
      dispatch(
        onChange({
          data: data?.subjectName ? { subjectName: data?.subjectName } : {},
        })
      );
    }
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
    questions: [{ question, options: [ans1, ans2, ans3, ans4], answer }],
    notes: [],
  };

  const previousHandler = () => {
    setIndex((index) => index - 1);
    type === "editExam"
      ? navigate(`/teacher/editExam/${index - 1}${search}`)
      : type === "viewExam"
      ? navigate(`/teacher/viewExam/${index - 1}${search}`)
      : navigate(`/teacher/create-exam/${index - 1}`);
  };

  const skipHandler = () => {
    if (data.subjectName) {
      setIndex((index) => index++);
      dispatch(clearForm());
      type === "editExam"
        ? navigate(`/teacher/editExam/${index + 1}${search}`)
        : navigate(`/teacher/create-exam/${index + 1}`);
    } else {
      toast.error("You can not skip First question.");
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
        ? navigate(`/teacher/editExam/${index + 1}${search}`)
        : type === "viewExam"
        ? navigate(`/teacher/viewExam/${index + 1}${search}`)
        : navigate(`/teacher/create-exam/${index + 1}`);
    } else if (valid && !formData.answer) {
      toast.error("Please Select Ans");
    }
  };

  const submitHandler = async () => {
    setFormData({ dispatch, formData, data, index });
    const valid = validation(createExamFormFields(index - 1));
    const filter = data.questions.filter((ele) => ele !== null);
    if (valid && formData.answer && filter.length === 14) {
      dispatch(
        setQuestion({
          subjectName: data?.subjectName,
          question: examData?.questions?.[0],
          note: notes,
          currentQue: index,
        })
      );
      const config = {
        url: "dashboard/Teachers/Exam",
        data: store.getState().teacher.examData,
        method: POST,
      };
      const response = await dispatch(api({ name: "createExam", config }));
      const { statusCode } = response?.payload?.data ?? {};

      statusCode === SUCCESS_CODE && navigate(`/teacher/view-exam`);
    } else if (valid && !formData.answer) {
      toast.error("Please Select Ans.");
    } else {
      toast.error(`Please Fill All Questions.`);
    }
  };

  const updateHandler = async () => {
    const valid = validation(createExamFormFields(index - 1));
    const filter = data.questions.filter((ele) => ele);
    if (
      valid &&
      formData.answer &&
      filter.length === CREATE_EXAM_LAST_QUESTION
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
      const { statusCode } = response?.payload?.data ?? {};

      statusCode === SUCCESS_CODE && navigate(`/teacher/view-exam`);
    } else {
      toast.error(`Please Fill All Questions.`);
    }
  };

  const buttonAttributes = ({ index, type }) => {
    return [
      {
        value: "Previous",
        type: "button",
        onClick: previousHandler,
        disabled:
          index === FIRST_QUESTION || loading.updateExam || loading.createExam,
      },
      type !== "viewExam" && {
        value: "Skip",
        type: "button",
        onClick: skipHandler,
        disabled:
          index === CREATE_EXAM_LAST_QUESTION ||
          loading.updateExam ||
          loading.createExam ||
          (type !== "editExam" && index === FIRST_QUESTION),
      },
      type !== "viewExam" && {
        value:
          type === "editExam"
            ? loading.updateExam
              ? "Updating.."
              : "Update"
            : loading.createExam
            ? "Submitting.."
            : "Submit",
        type: "button",
        onClick: type === "editExam" ? updateHandler : submitHandler,
        disabled:
          (type !== "editExam" && index !== CREATE_EXAM_LAST_QUESTION) ||
          loading.updateExam ||
          loading.createExam,
      },
      {
        value: "Next",
        type: "button",
        onClick: nextHandler,
        disabled: index >= CREATE_EXAM_LAST_QUESTION || loading.updateExam,
      },
    ];
  };

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

            {buttonAttributes({ index, type }).map(
              ({ value, ...rest }, index) => {
                return (
                  value && <CustomButton key={index} {...rest} value={value} />
                );
              }
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateExam;
