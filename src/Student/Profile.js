import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../redux/actions/apiAction";
import Sidebar from "./Sidebar";

const Profile = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.api);
  const { studentProfile } = data;
  const { editedProfile } = data;
  const { studentProfile: ProfileLoader } = loading;
  const { editedProfile: editLoader } = loading;
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(data?.name);

  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: "student/getStudentDetail",
        method: "get",
      };
      await dispatch(api({ name: "studentProfile", config }));
    };
    fetch();
  }, [dispatch]);

  const editProfile = () => {
    setIsEdit(true);
  };

  const submitProfile = async () => {
    setIsEdit(false);
    const config = {
      url: "student/studentProfile",
      method: "put",
      data: { name: name },
    };
    await dispatch(api({ name: "editedProfile", config }));
  };

  return (
    <div>
      <Sidebar />
      <h1>Profile</h1>
      {studentProfile?.name && (
        <>
          <h3>
            Name:
            {editLoader ? (
              "Updating"
            ) : isEdit ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : editedProfile ? (
              editedProfile?.name
            ) : (
              studentProfile?.name
            )}
          </h3>
        </>
      )}
      {ProfileLoader && <h1>Loading..</h1>}

      <button onClick={isEdit ? submitProfile : editProfile}>
        {isEdit ? "Submit" : "Edit Profile"}
      </button>
    </div>
  );
};

export default Profile;
