import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../redux/actions/apiAction";
import Loader from "../shared/Loader";

import Sidebar from "../Student/Sidebar";
import { GET } from "../constants";
import Table from "../shared/Table";
import { useNavigate } from "react-router-dom";

const AllStudents = () => {
  const { data, loading } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewStudentDetailHandler = (e, id) => {
    navigate(`/teacher/viewStudentDetail?id=${id}`);
  };
  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: "dashboard/Teachers",
        method: GET,
      };
      await dispatch(api({ name: "allStudents", config }));
    };
    !data.allStudents && fetch();
  }, [dispatch, data]);

  return (
    <div>
      <Sidebar />
      <h1 style={{ textAlign: "center" }}>All Students Details.</h1>
      <div className="table">
        <Table
          tableHeading={["No.", "Name", "Email", "Status", "Action"]}
          tableBody={data}
        >
          {data &&
            data.allStudents?.map((ele, index) => {
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
        </Table>
        {/* <table>
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
            {data &&
              data.allStudents?.map((ele, index) => {
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
        </table> */}
        <Loader loading={loading.allStudents} />
      </div>
    </div>
  );
};

export default React.memo(AllStudents);
