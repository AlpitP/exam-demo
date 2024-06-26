import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET } from "../constants";
import api from "../redux/actions/apiAction";
import CustomButton from "../shared/Button";
import Loader from "../shared/Loader";
import Table from "../shared/Table";
import "./allExam.css";

const AllExams = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.api);
  const navigate = useNavigate();
  const { allExam } = data;
  const { allExam: allExamLoader } = loading;

  const fetch = () => {
    const config = {
      url: "student/studentExam",
      method: GET,
    };
    dispatch(api({ name: "allExam", config }));
  };

  useEffect(() => {
    fetch();
  }, []);

  const giveExam = ({ alreadyGiveExam, ele }) => {
    alreadyGiveExam
      ? navigate("/student/view-result", {
          state: ele?.Result?.[0],
        })
      : navigate(`/student/give-exam/${1}?id=${ele._id}`);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>All Exams</h1>
      <div className="table" style={{ marginTop: 20 }}>
        <Table tableHeadings={["No.", "Subject", "Teacher Email", "Action"]}>
          {allExam?.map((ele, index) => {
            const alreadyGiveExam = ele?.Result?.length;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.subjectName}</td>
                <td>{ele.email}</td>
                <td>
                  <CustomButton
                    value={alreadyGiveExam ? "View Result" : "Give Exam"}
                    onClick={() => giveExam({ alreadyGiveExam, ele })}
                  />
                </td>
              </tr>
            );
          })}
        </Table>
        <Loader loading={allExamLoader} />
      </div>
    </>
  );
};

export default AllExams;
