import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../redux/actions/apiAction";
import Sidebar from "../Student/Sidebar";
import Loader from "../shared/Loader";
import { GET } from "../constants";

const Student = () => {
  const { data, loading } = useSelector((state) => state.api);
  const { viewStudentDetail } = data;
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: `dashboard/Teachers/viewStudentDetail${search}`,
        method: GET,
      };
      await dispatch(api({ name: "viewStudentDetail", config }));
    };
    fetch();
  }, [dispatch, search]);
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
          <Loader loading={loading.viewStudentDetail} />
        ) : (
          <>
            <h2>Name: {viewStudentDetail && viewStudentDetail?.[0]?.name}</h2>
            <h2>Email: {viewStudentDetail && viewStudentDetail?.[0]?.email}</h2>
            {viewStudentDetail?.[0]?.Result?.length > 0 && (
              <h2>Rank:{viewStudentDetail[0]?.Result[0]?.rank}</h2>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Student;
