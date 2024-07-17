import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET } from "../constants";
import api from "../redux/actions/apiAction";
import { clearExam } from "../redux/slices/teacherSlice";
import Loader from "../shared/Loader";
import ViewExamContainer from "./ViewExamContainer";

export const fetch = async ({ dispatch }) => {
  const config = {
    url: "dashboard/Teachers/viewExam",
    method: GET,
  };
  await dispatch(api({ name: "viewExam", config }));
};

const ViewExam = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.api);

  useEffect(() => {
    fetch({ dispatch });
    return () => dispatch(clearExam());
  }, [data.deleteExam, dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>View Exams</h1>
      {loading.viewExam ? (
        <Loader loading={loading.viewExam} />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {data?.viewExam?.length ? (
            data?.viewExam?.map((ele, index) => {
              return (
                <ViewExamContainer examsData={ele} key={index} id={index} />
              );
            })
          ) : (
            <h1>Exam Not Found.</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewExam;
