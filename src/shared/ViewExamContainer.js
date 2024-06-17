import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../redux/actions/apiAction";
import { fetchEditExam } from "../Teacher/EditExam";

const ViewExamContainer = ({ examsData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div style={{ border: "1px solid black", width: "auto", padding: 10 }}>
      <h2>Subject : {examsData.subjectName}</h2>
      <h3>Email : {examsData.email}</h3>
      <h3>
        Notes :
        {examsData.notes.map((ele) => {
          return ele;
        })}
      </h3>
      <div style={{ marginLeft: "33%" }}>
        <button
          style={{ marginRight: 10 }}
          onClick={() => {
            navigate(`/teacher/examDetail?id=${examsData._id}`, {
              state: {
                subjectName: examsData.subjectName,
                notes: examsData.notes,
              },
            });
            fetchEditExam({ id: examsData._id, dispatch });
          }}
        >
          Edit
        </button>
        <button
          onClick={async () => {
            const config = {
              url: `dashboard/Teachers/deleteExam?id=${examsData._id}`,
              method: "DELETE",
            };
            await dispatch(api({ name: "deleteExam", config }));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ViewExamContainer;
