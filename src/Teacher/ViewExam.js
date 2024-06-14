import React, { useEffect } from "react";
import Sidebar from "../Student/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import api from "../redux/actions/apiAction";
import ViewExamContainer from "../shared/ViewExamContainer";
import Loader from "../shared/Loader";

const ViewExam = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.api);

  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: "dashboard/Teachers/viewExam",
        method: "GET",
      };
      const response = await dispatch(api({ name: "createExam", config }));
      const { data } = response?.payload?.data ?? {};
      console.log(data);
      // statusCode === SUCCESS_CODE && navigate(`/teacher/view-exam`);
    };
    !data.createExam && fetch();
  }, [dispatch, data]);

  return (
    <div>
      <Sidebar />
      <h3>View Exams</h3>
      {loading && <Loader loading={loading.createExam} />}
      {data?.createExam?.map((ele, index) => {
        return <ViewExamContainer examsData={ele} key={index} />;
      })}
    </div>
  );
};

export default ViewExam;
