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
  const controller = new AbortController();
  const fetch = () => {
    const config = {
      url: "dashboard/Teachers",
      method: GET,
      signal: controller.signal,
    };
    dispatch(api({ name: "allStudents", config }));
  };

  useEffect(() => {
    !data.allStudents && fetch();
    return () => controller.abort();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>All Students Details.</h1>
      <div className="table">
        <Table tableHeadings={["No.", "Name", "Email", "Status", "Action"]}>
          {data.allStudents?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.status}</td>
                <td>
                  <CustomButton
                    value="View"
                    onClick={() =>
                      navigate(`/teacher/view-student-detail?id=${ele._id}`)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </Table>
        <Loader loading={loading.allStudents} />
      </div>
    </div>
  );
};

export default AllStudents;
