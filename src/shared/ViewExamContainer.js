import React from "react";
import { useNavigate } from "react-router-dom";

const ViewExamContainer = ({ examsData }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Subject : {examsData.subjectName}</h2>
      <h3>Email : {examsData.email}</h3>
      <button
        onClick={() => navigate(`/teacher/examDetail?id=${examsData._id}`)}
      >
        Edit
      </button>
      <button>Delete</button>
    </div>
  );
};

export default ViewExamContainer;
