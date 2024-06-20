import React from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const ViewResult = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <Sidebar />
      <h1 style={{ textAlign: "center" }}>Result</h1>
      <div
        style={{
          textAlign: "center",
          border: "1px solid black",
          width: "30%",
          marginLeft: "35%",
        }}
      >
        <h3>Subject :- {state?.subjectName}</h3>
        <h3>Rank :- {state?.rank}</h3>
        <h3>Status :- {state?.resultStatus}</h3>
      </div>
    </div>
  );
};

export default ViewResult;
