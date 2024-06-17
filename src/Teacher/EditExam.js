import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../redux/actions/apiAction";
import { addQuestion } from "../redux/slices/teacherSlice";
import CreateExam from "./CreateExam";

export const fetchEditExam = async ({ search, dispatch, id }) => {
  if (id) {
    search = `?id=${id}`;
  } else {
    search = `${search}`;
  }
  const config = {
    url: `dashboard/Teachers/examDetail${search}`,
    method: "GET",
  };
  await dispatch(api({ name: "editExam", config }));
};
const EditExam = () => {
  const dispatch = useDispatch();
  const { search, state } = useLocation();
  const { data } = useSelector((state) => state.api);

  useEffect(() => {
    !data.editExam && fetchEditExam({ search, dispatch });
    dispatch(
      addQuestion({
        data: data?.editExam?.questions ?? [],
        subjectName: state?.subjectName,
        notes: state?.notes,
      })
    );
    return () =>
      dispatch(
        addQuestion({
          data: [],
          subjectName: "",
          notes: [],
        })
      );
  }, [dispatch, data.editExam, state, search]);

  const formData = {
    subjectName: state.subjectName ?? "",
    question: data?.editExam?.questions?.[0]?.question ?? "",
    answer: data?.editExam?.questions?.[0]?.answer ?? "",
    ans1: data?.editExam?.questions?.[0]?.options?.[0] ?? "",
    ans2: data?.editExam?.questions?.[0]?.options?.[1] ?? "",
    ans3: data?.editExam?.questions?.[0]?.options?.[2] ?? "",
    ans4: data?.editExam?.questions?.[0]?.options?.[3] ?? "",
    notes: state?.notes?.[0] ?? "",
  };
  return (
    <div>
      <CreateExam type="editExam" exam={formData} />
    </div>
  );
};

export default EditExam;
