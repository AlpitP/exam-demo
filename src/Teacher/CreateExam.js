import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Student/Sidebar";
import { clearForm } from "../redux/slices/formSlice";
import { currentQuestionFormData } from "../redux/slices/teacherSlice";
import store from "../redux/store/store";
import ButtonGroup from "../shared/ButtonGroup";
import Form from "../shared/Form";
import Loader from "../shared/Loader";
import { createExamFormFields } from "../utils/createExamFormFields";

// const initialState = {
//   subjectName: "",
//   question: "",
//   ans1: "",
//   ans2: "",
//   ans3: "",
//   ans4: "",
//   answer: "",
//   notes: "",
// };

const CreateExam = ({ type, exam, id }) => {
  const [index, setIndex] = useState(id);
  const { loading } = useSelector((state) => state.api);
  // const navigate = useNavigate();
  // const { search } = useLocation();
  const { formData } = useSelector((state) => state.formData);
  const { examData: data } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();
  // const [currentQuestion, setCurrentQuestion] = useState(initialState);

  const { subjectName, notes, question, answer, ans1, ans2, ans3, ans4 } =
    formData;

  useEffect(() => {
    dispatch(
      currentQuestionFormData({
        data: {
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
            <ButtonGroup
              index={index}
              setIndex={setIndex}
              type={type}
              loading={loading}
              formData={formData}
              data={data}
              examData={examData}
              notes={notes}
              action="createExam"
            />
            {/* <CustomButton
              text="Previous"
              onClick={() =>
                previousHandler({
                  setIndex,
                  index,
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
                  index,
                  data,
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
                  subjectName:
                    index === 1 ? examData?.subjectName : data.subjectName,
                  navigate,
                  type,
                  search,
                })
              }
              disabled={index >= 15 || loading.updateExam}
            /> */}
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateExam;
