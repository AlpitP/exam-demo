import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../redux/actions/apiAction";
import "./allExam.css";
import Sidebar from "./Sidebar";
import Loader from "../shared/Loader";

const AllExams = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.api);
  const { allExam } = data;
  const { allExam: allExamLoading } = loading;

  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: "student/studentExam",
        method: "get",
      };
      await dispatch(api({ name: "allExam", config }));
    };
    fetch();
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <h1 style={{ textAlign: "center" }}>All Exams</h1>
      <div className="table" style={{ marginTop: 20 }}>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Subject</th>
              <th>Teacher Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allExam &&
              allExam?.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ele.subjectName}</td>
                    <td>{ele.email}</td>
                    <td>
                      <button>Give Exam</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Loader loading={allExamLoading} />
      </div>
    </>
  );
};

export default AllExams;
