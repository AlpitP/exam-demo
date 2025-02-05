import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GET } from "../constants";
import api from "../redux/actions/apiAction";
import Loader from "../shared/Loader";

const Student = () => {
  const { data, loading } = useSelector((state) => state.api);
  const { viewStudentDetail } = data;
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = () => {
      const config = {
        url: `dashboard/Teachers/viewStudentDetail${search}`,
        method: GET,
      };
      dispatch(api({ name: "viewStudentDetail", config }));
    };
    fetch();
  }, [dispatch, search]);
  const { name, email, Result } = viewStudentDetail?.[0] ?? {};

  if (loading.viewStudentDetail) {
    return <Loader loading={loading.viewStudentDetail} />;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Student Detail.</h1>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <>
          <h2>Name: {name}</h2>
          <h2>Email: {email}</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginBlock: 10,
              flexWrap: "wrap",
            }}
          >
            {Result &&
              Result.map((ele, index) => {
                return (
                  <div
                    style={{ border: "1px solid black", padding: 10 }}
                    key={index}
                  >
                    <h3>Subject : {ele.subjectName}</h3>
                    <h3>Score : {ele.score}</h3>
                    <h3>Rank : {ele.rank}</h3>
                    <h3>Result Status : {ele.resultStatus}</h3>
                  </div>
                );
              })}
          </div>
        </>
      </div>
    </div>
  );
};

export default Student;
