import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../redux/actions/apiAction";
import Sidebar from "../Student/Sidebar";

const Student = () => {
  const { data, loading } = useSelector((state) => state.api);
  const { viewStudentDetail } = data;
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: `dashboard/Teachers/viewStudentDetail${search}`,
        method: "get",
      };
      await dispatch(api({ name: "viewStudentDetail", config }));
    };
    !viewStudentDetail && fetch();
  }, [dispatch, search, viewStudentDetail]);
  return (
    <div>
      <Sidebar />
      <h1 style={{ textAlign: "center" }}>Student Detail.</h1>
      <div
        style={{
          textAlign: "center",
          border: "1px solid black",
          width: "40%",
          marginInline: "auto",
        }}
      >
        {loading.viewStudentDetail ? (
          <h1>Loading.</h1>
        ) : (
          <>
            <h2>Name: {viewStudentDetail && viewStudentDetail[0].name}</h2>
            <h2>Email: {viewStudentDetail && viewStudentDetail[0].email}</h2>
            {viewStudentDetail && (
              <h2>Rank:{viewStudentDetail[0]?.Result[0]?.rank}</h2>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Student;
