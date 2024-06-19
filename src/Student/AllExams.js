import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../redux/actions/apiAction";
import "./allExam.css";
import Sidebar from "./Sidebar";
import Loader from "../shared/Loader";
import { useNavigate } from "react-router-dom";
import { GET } from "../constants";
import { toast } from "react-toastify";

const AllExams = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.api);
  const navigate = useNavigate();
  const { allExam } = data;
  const { allExam: allExamLoader } = loading;

  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: "student/studentExam",
        method: GET,
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
                      <button
                        onClick={() =>
                          ele?.Result?.length > 0
                            ? navigate("/student/view-result", {
                                state: ele?.Result?.[0],
                              })
                            : navigate(
                                `/student/give-exam/question${1}?id=${ele._id}`
                              )
                        }
                      >
                        {ele?.Result?.length > 0 ? "View Result" : "Give Exam"}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Loader loading={allExamLoader} />
      </div>
    </>
  );
};

export default AllExams;
