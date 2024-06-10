import React, { useEffect } from "react";
import api from "../redux/actions/apiAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../shared/Loader";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const AllStudents = () => {
  const { data, loading } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: "dashboard/Teachers",
        method: "get",
      };
      await dispatch(api({ name: "all students", config }));
    };
    fetch();
  }, [dispatch]);

  const viewStudentDetailHandler = (e, id) => {
    console.log(e, id);
    navigate(`/teacher/viewStudentDetail?id=${id}`);
  };
  return (
    <div>
      <Sidebar />
      <h1 style={{ textAlign: "center" }}>All Students Details.</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).length > 0 &&
              data?.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.status}</td>
                    <td>
                      <button
                        onClick={(e) => viewStudentDetailHandler(e, ele._id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Loader loading={loading} />
      </div>
    </div>
  );
};

export default AllStudents;
