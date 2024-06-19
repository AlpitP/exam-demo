import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../redux/actions/apiAction";
import { fetchEditExam } from "../Teacher/EditExam";
import { DELETE } from "../constants";

const ViewExamContainer = ({ examsData, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.api);
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
          disabled={loading.deleteExam}
        >
          Edit
        </button>
        <button
          onClick={async () => {
            const config = {
              url: `dashboard/Teachers/deleteExam?id=${examsData._id}`,
              method: DELETE,
            };
            await dispatch(api({ name: "deleteExam", config }));
          }}
          disabled={loading.deleteExam}
        >
          {loading.deleteExam && index ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ViewExamContainer;
