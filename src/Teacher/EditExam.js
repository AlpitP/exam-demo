import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GET } from "../constants";
import api from "../redux/actions/apiAction";
import { setQuestion, clearExam } from "../redux/slices/teacherSlice";
import CreateExam from "./CreateExam";

export const fetchExam = async ({ search, dispatch, id }) => {
  search = id ? `?id=${id}` : `${search}`;
  const config = {
    url: `dashboard/Teachers/examDetail${search}`,
    method: GET,
  };
  await dispatch(api({ name: "editExam", config }));
};

const EditExam = ({ id }) => {
  const dispatch = useDispatch();
  const { search, state, pathname } = useLocation();
  const { data } = useSelector((state) => state.api);
  const { examData } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(
      setQuestion({
        data: data?.editExam?.questions ?? [],
        subjectName: state?.subjectName ?? examData?.subjectName,
        notes: state?.notes ?? examData?.notes,
      })
    );
  }, [data]);

  useEffect(() => {
    fetchExam({ search, dispatch });
    return () => dispatch(clearExam());
  }, []);

  return (
    <div>
      <CreateExam
        type={pathname.includes("viewExam") ? "viewExam" : "editExam"}
        id={id}
      />
    </div>
  );
};

export default EditExam;
