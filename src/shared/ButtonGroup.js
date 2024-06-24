import React from "react";
import CustomButton from "./Button";
import { previousHandler } from "../container/createExam/previousHandler";
import { updateHandler } from "../container/createExam/updateHandler";
import { submitHandler } from "../container/createExam/submitHandler";
import { skipHandler } from "../container/createExam/skipHandler";
import { nextHandler } from "../container/createExam/nextHandler";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { previousQuestionHandler } from "../container/giveExam/previousQuestionHandler";
import { submitExamHandler } from "../container/giveExam/submitExamHandler";
import { skipQuestionHandler } from "../container/giveExam/skipQuestionHandler";
import { nextQuestionHandler } from "../container/giveExam/nextQuestionHandler";

const ButtonGroup = ({
  index,
  setIndex,
  type,
  loading,
  formData,
  data,
  examData,
  notes,
  action,
  giveExam,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  return (
    <div>
      {" "}
      <CustomButton
        text="Previous"
        onClick={() =>
          action === "createExam"
            ? previousHandler({
                setIndex,
                index,
                navigate,
                type,
                search,
              })
            : previousQuestionHandler({
                dispatch,
                setIndex,
                index,
                navigate,
                search,
              })
        }
        disabled={
          action === "createExam"
            ? index <= 1 || loading.updateExam || loading.createExam
            : index === 1 || giveExam
        }
      />
      {type !== "viewExam" && (
        <>
          <CustomButton
            text={
              action === "createExam"
                ? type === "editExam"
                  ? loading.updateExam
                    ? "Updating..."
                    : "Update"
                  : loading.createExam
                  ? "Submitting..."
                  : "Submit"
                : giveExam
                ? "Submitting..."
                : "Submit"
            }
            onClick={() => {
              action === "createExam"
                ? type === "editExam"
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
                    })
                : submitExamHandler({
                    dispatch,
                    navigate,
                    formData,
                    index,
                    search,
                    examData,
                  });
            }}
            disabled={
              action === "createExam"
                ? (type !== "editExam" && index !== 15) ||
                  loading.updateExam ||
                  loading.createExam
                : index !== 7 || giveExam
            }
          />

          <CustomButton
            text="Skip"
            onClick={() =>
              action === "createExam"
                ? skipHandler({
                    setIndex,
                    dispatch,
                    index,
                    data,
                    navigate,
                    type,
                    search,
                  })
                : skipQuestionHandler({
                    dispatch,
                    setIndex,
                    index,
                    navigate,
                    search,
                  })
            }
            disabled={
              action === "createExam"
                ? index === 15 || loading.updateExam
                : index === 7
            }
          />
        </>
      )}
      <CustomButton
        text="Next"
        onClick={() =>
          action === "createExam"
            ? nextHandler({
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
            : nextQuestionHandler({
                dispatch,
                formData,
                setIndex,
                index,
                navigate,
                search,
              })
        }
        disabled={
          action === "createExam"
            ? index >= 15 || loading.updateExam
            : index === 7
        }
      />
    </div>
  );
};

export default ButtonGroup;
