import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../redux/actions/apiAction";
import Sidebar from "../Student/Sidebar";

const Student = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.api);
  const { viewStudentDetail } = data;

  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: `dashboard/Teachers/viewStudentDetail${search}`,
        method: "get",
      };
      await dispatch(api({ name: "viewStudentDetail", config }));
    };
    fetch();
  }, [dispatch, search]);
  return (
    <div>
      <Sidebar />
      <div
        style={{
          textAlign: "center",
          border: "1px solid black",
          width: "40%",
          marginInline: "auto",
        }}
      >
        <h1>Student Detail.</h1>
        {loading.viewStudentDetail ? (
          <h1>Loading.</h1>
        ) : (
          <>
            <h2>Name: {viewStudentDetail && viewStudentDetail[0].name}</h2>
            <h2>Email: {viewStudentDetail && viewStudentDetail[0].email}</h2>
            {viewStudentDetail && (
              <h2>{viewStudentDetail[0]?.Result[0]?.rank}</h2>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Student;
