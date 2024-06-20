import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEditExam } from "../Teacher/EditExam";
import { DELETE } from "../constants";
import api from "../redux/actions/apiAction";
import CustomButton from "./Button";

const ViewExamContainer = ({ examsData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.api);
  return (
    <div style={{ border: "1px solid black", width: "auto", padding: 10 }}>
      <h2>Subject : {examsData.subjectName}</h2>
      <h3>Email : {examsData.email}</h3>
      <h3>Notes : {examsData.notes[0]}</h3>
      <div style={{ marginLeft: "30%" }}>
        <CustomButton
          text="Edit"
          onClick={() => {
            navigate(`/teacher/examDetail/question1?id=${examsData._id}`, {
              state: {
                subjectName: examsData?.subjectName,
                notes: examsData?.notes,
              },
            });
            fetchEditExam({ id: examsData._id, dispatch });
          }}
          disabled={loading.deleteExam}
          style={{ marginInline: 10 }}
        />
        <CustomButton
          text={loading.deleteExam ? "Deleting..." : "Delete"}
          onClick={async () => {
            const config = {
              url: `dashboard/Teachers/deleteExam?id=${examsData._id}`,
              method: DELETE,
            };
            await dispatch(api({ name: `deleteExam`, config }));
          }}
          disabled={loading.deleteExam}
        />
      </div>
    </div>
  );
};

export default ViewExamContainer;
