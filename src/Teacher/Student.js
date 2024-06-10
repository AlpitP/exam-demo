import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../redux/actions/apiAction";
import Sidebar from "./Sidebar";

const Student = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.api);
  console.log(data);
  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: `dashboard/Teachers/viewStudentDetail${search}`,
        method: "get",
      };
      const response = await dispatch(
        api({ name: "view Student Detail", config })
      );
      console.log(response);
    };
    fetch();
  }, [dispatch, search]);
  return (
    <div>
      <Sidebar />
      <h1>Student Detail.</h1>
      {loading ? (
        <h1>Loading.</h1>
      ) : (
        <>
          <h2>Name: {data && data[0].name}</h2>
          <h2>Email: {data && data[0].email}</h2>
          <h2>Status: {data && data[0].status}</h2>
        </>
      )}
    </div>
  );
};

export default Student;
