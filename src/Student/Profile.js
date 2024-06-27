import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET } from "../constants";
import api from "../redux/actions/apiAction";
import { clearForm, removeError, setError } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Input from "../shared/Input";
import { toast } from "react-toastify";

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
    if (!name) {
      dispatch(setError({ name: "name", error: "Please Enter Name." }));
    } else {
      dispatch(removeError({ name: "name" }));
    }
  }, [name, dispatch]);

  const editProfile = (e) => {
    e.preventDefault();
    setName(studentProfile?.name);
    setIsEdit(true);
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    if (name) {
      setIsEdit(false);
      const config = {
        url: "student/studentProfile",
        method: "put",
        data: { name },
      };
      const response = await dispatch(api({ name: "studentProfile", config }));
      const { message } = response?.payload?.data ?? {};
      toast.success(message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {profileLoader ? (
        <h1>Loading..</h1>
      ) : (
        studentProfile?.name && (
          <form onSubmit={isEdit ? submitProfile : editProfile}>
            {isEdit ? (
              <Input
                type="text"
                label="Name"
                name="name"
                value={name}
                errorMessage={error.name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <h3>Name: {studentProfile?.name}</h3>
            )}
            <CustomButton value={isEdit ? "Submit" : "Edit Profile"} />
          </form>
        )
      )}
    </div>
  );
};

export default Profile;
