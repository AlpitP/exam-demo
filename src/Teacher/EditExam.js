import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../redux/actions/apiAction";
import { addQuestion } from "../redux/slices/teacherSlice";
import CreateExam from "./CreateExam";

const EditExam = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { data } = useSelector((state) => state.api);
  const { examData } = useSelector((state) => state.teacher);

  const fetchExamData = async () => {
    const config = {
      url: `dashboard/Teachers/viewExam`,
      method: "GET",
    };
    await dispatch(api({ name: "viewExam", config }));
  };

  useEffect(() => {
    const fetchExam = async () => {
      const config = {
        url: `dashboard/Teachers/examDetail${search}`,
        method: "GET",
      };
      await dispatch(api({ name: "editExam", config }));
    };
    !data.editExam && fetchExam();
    !data.viewExam && fetchExamData();
    dispatch(
      addQuestion({
        data: data?.editExam?.questions ?? [],
        subjectName: data?.viewExam?.[0].subjectName,
        notes: data?.viewExam?.[0].notes,
      })
    );
  }, [search, dispatch, data]);

  const formData = {
    subjectName: examData?.subjectName ?? "",
    question: examData?.questions?.[0]?.question ?? "",
    answer: examData?.questions?.[0]?.answer ?? "",
    ans1: examData?.questions?.[0]?.options?.[0] ?? "",
    ans2: examData?.questions?.[0]?.options?.[1] ?? "",
    ans3: examData?.questions?.[0]?.options?.[2] ?? "",
    ans4: examData?.questions?.[0]?.options?.[3] ?? "",
    notes: examData?.notes?.[0] ?? "",
  };
  return (
    <div>
      <CreateExam type="editExam" exam={formData} />
    </div>
  );
};

export default EditExam;
