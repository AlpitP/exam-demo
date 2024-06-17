import React, { useEffect } from "react";
import Sidebar from "../Student/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import api from "../redux/actions/apiAction";
import ViewExamContainer from "../shared/ViewExamContainer";
import Loader from "../shared/Loader";

export const fetch = async ({ dispatch }) => {
  const config = {
    url: "dashboard/Teachers/viewExam",
    method: "GET",
  };
  await dispatch(api({ name: "viewExam", config }));
};

const ViewExam = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.api);
  // const { examData } = useSelector((state) => state.teacher);

  useEffect(() => {
    fetch({ dispatch });
  }, [dispatch]);

  return (
    <div>
      <Sidebar />
      <h1 style={{ textAlign: "center" }}>View Exams</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {loading.viewExam ? (
          <Loader loading={loading.viewExam} />
        ) : (
          data?.viewExam?.map((ele, index) => {
            return <ViewExamContainer examsData={ele} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default ViewExam;
