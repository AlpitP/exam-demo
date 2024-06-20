import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GET } from "../constants";
import api from "../redux/actions/apiAction";
import {
  addQuestion,
  clearExam,
  currentQuestionFormData,
} from "../redux/slices/teacherSlice";
import CreateExam from "./CreateExam";

export const fetchEditExam = async ({ search, dispatch, id }) => {
  if (id) {
    search = `?id=${id}`;
  } else {
    search = `${search}`;
  }
  const config = {
    url: `dashboard/Teachers/examDetail${search}`,
    method: GET,
  };
  await dispatch(api({ name: "editExam", config }));
};

const EditExam = ({ id }) => {
  const dispatch = useDispatch();
  const { search, state } = useLocation();

  const { data } = useSelector((state) => state.api);
  const { examData } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(
      addQuestion({
        data: data?.editExam?.questions ?? [],
        subjectName: state?.subjectName ?? examData?.subjectName,
        notes: state?.notes ?? examData?.notes,
      })
    );
    dispatch(
      currentQuestionFormData({
        question: examData?.questions?.[id - 1]?.question ?? "",
        answer: examData?.questions?.[id - 1]?.answer ?? "",
        ans1: examData?.questions?.[id - 1]?.options?.[0] ?? "",
        ans2: examData?.questions?.[id - 1]?.options?.[1] ?? "",
        ans3: examData?.questions?.[id - 1]?.options?.[2] ?? "",
        ans4: examData?.questions?.[id - 1]?.options?.[3] ?? "",
        subjectName: examData?.subjectName,
        notes: examData?.notes,
      })
    );
  }, [data]);

  useEffect(() => {
    fetchEditExam({ search, dispatch });
    return () => dispatch(clearExam());
  }, []);

  // const formData = {
  //   subjectName: examData?.subjectName ?? "",
  //   question: examData?.questions?.[0]?.question ?? "",
  //   answer: examData?.questions?.[0]?.answer ?? "",
  //   ans1: examData?.questions?.[0]?.options?.[0] ?? "",
  //   ans2: examData?.questions?.[0]?.options?.[1] ?? "",
  //   ans3: examData?.questions?.[0]?.options?.[2] ?? "",
  //   ans4: examData?.questions?.[0]?.options?.[3] ?? "",
  //   notes: examData?.notes?.[0] ?? "",
  // };
  return (
    <div>
      <CreateExam type="editExam" id={id} />
    </div>
  );
};

export default EditExam;
