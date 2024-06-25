import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../redux/actions/apiAction";
import Loader from "../shared/Loader";

import { useNavigate } from "react-router-dom";
import { GET } from "../constants";
import CustomButton from "../shared/Button";
import Table from "../shared/Table";

const AllStudents = () => {
  const { data, loading } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewStudentDetailHandler = (e, id) => {
    navigate(`/teacher/viewStudentDetail?id=${id}`);
  };
  useEffect(() => {
    const fetch = () => {
      const config = {
        url: "dashboard/Teachers",
        method: GET,
      };
      dispatch(api({ name: "allStudents", config }));
    };
    fetch();
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>All Students Details.</h1>
      <div className="table">
        <Table tableHeadings={["No.", "Name", "Email", "Status", "Action"]}>
          {data &&
            data.allStudents?.map((ele, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.email}</td>
                  <td>{ele.status}</td>
                  <td>
                    <CustomButton
                      value="View"
                      onClick={(e) => viewStudentDetailHandler(e, ele._id)}
                    />
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
