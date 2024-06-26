import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET } from "../constants";
import api from "../redux/actions/apiAction";
import { clearForm, removeError, setError } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Input from "../shared/Input";

const Profile = () => {
  const { error } = useSelector((state) => state.formData);
  const { data, loading } = useSelector((state) => state.api);
  const { studentProfile } = data;
  const { studentProfile: profileLoader } = loading;
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(studentProfile?.name ?? "");

  const fetch = () => {
    const config = {
      url: "student/getStudentDetail",
      method: GET,
    };
    dispatch(api({ name: "studentProfile", config }));
  };

  useEffect(() => {
    !studentProfile && fetch();
    return () => dispatch(clearForm());
  }, [dispatch, studentProfile?.name]);

  useEffect(() => {
    if (name === "") {
      dispatch(setError({ name: "name", error: "Please Enter Name." }));
    } else {
      dispatch(removeError({ name: "name" }));
    }
  }, [name, dispatch]);

  const editProfile = () => {
    setName(studentProfile?.name);
    setIsEdit(true);
  };

  const submitProfile = () => {
    if (name) {
      setIsEdit(false);
      const config = {
        url: "student/studentProfile",
        method: "put",
        data: { name },
      };
      dispatch(api({ name: "studentProfile", config }));
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {profileLoader ? (
        <h1>Loading..</h1>
      ) : (
        studentProfile?.name && (
          <>
            {isEdit ? (
              <>
                <Input
                  type="text"
                  label="Name"
                  name="name"
                  value={name ?? ""}
                  errorMessage={error.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            ) : (
              <h3>Name: {studentProfile?.name}</h3>
            )}
          </>
        )
      )}

      <CustomButton
        onClick={isEdit ? submitProfile : editProfile}
        disabled={profileLoader}
        value={
          isEdit ? "Submit" : profileLoader ? "Updating..." : "Edit Profile"
        }
      />
    </div>
  );
};

export default Profile;
