import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchExam } from "./EditExam";
import { DELETE } from "../constants";
import api from "../redux/actions/apiAction";
import CustomButton from "../shared/Button";

const ViewExamContainer = ({ examsData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.api);

  const editExamHandler = () => {
    navigate(`/teacher/edit-exam/1?id=${examsData._id}`, {
      state: {
        subjectName: examsData?.subjectName,
        notes: examsData?.notes,
      },
    });
    fetchExam({ id: examsData._id, dispatch });
  };
  const viewExamHandler = () => {
    navigate(`/teacher/view-exam/1?id=${examsData._id}`, {
      state: {
        subjectName: examsData?.subjectName,
        notes: examsData?.notes,
      },
    });
    fetchExam({ id: examsData._id, dispatch });
  };
  const deleteExamHandler = () => {
    const config = {
      url: `dashboard/Teachers/deleteExam?id=${examsData._id}`,
      method: DELETE,
    };
    dispatch(api({ name: `deleteExam`, config }));
  };

  return (
    <div style={{ border: "1px solid black", width: "auto", padding: 10 }}>
      <h2>Subject : {examsData.subjectName}</h2>
      <h3>Email : {examsData.email}</h3>
      <h3>Notes : {examsData.notes[0]}</h3>
      <div style={{ marginLeft: "25%" }}>
        <CustomButton
          value="Edit"
          onClick={editExamHandler}
          disabled={loading.deleteExam}
        />
        <CustomButton
          value="View"
          onClick={viewExamHandler}
          disabled={loading.deleteExam}
          style={{ marginInline: 10 }}
        />
        <CustomButton
          value={loading.deleteExam ? "Deleting..." : "Delete"}
          onClick={deleteExamHandler}
          disabled={loading.deleteExam}
        />
      </div>
    </div>
  );
};

export default ViewExamContainer;
