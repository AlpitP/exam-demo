import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../redux/actions/apiAction";
import Sidebar from "./Sidebar";
import Input from "../shared/Input";
import CustomButton from "../shared/Button";

const Profile = () => {
  const { data, loading } = useSelector((state) => state.api);
  const { studentProfile, editedProfile } = data;
  const { studentProfile: ProfileLoader, editedProfile: editLoader } = loading;
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const config = {
        url: "student/getStudentDetail",
        method: "get",
      };
      await dispatch(api({ name: "studentProfile", config }));
    };
    !studentProfile && fetch();
  }, [dispatch, studentProfile]);

  const editProfile = () => {
    setName(editedProfile?.name || studentProfile?.name);
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
      {ProfileLoader ? (
        <h1>Loading..</h1>
      ) : (
        studentProfile?.name && (
          <>
            {isEdit ? (
              <>
                <Input
                  type="text"
                  value={name}
                  label="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            ) : editedProfile ? (
              <h3>Name: {editedProfile?.name}</h3>
            ) : (
              <h3>Name: {studentProfile?.name}</h3>
            )}
          </>
        )
      )}

      <CustomButton
        onClick={isEdit ? submitProfile : editProfile}
        disabled={editLoader}
        text={isEdit ? "Submit" : editLoader ? "Updating" : "Edit Profile"}
      />
    </div>
  );
};

export default Profile;
