import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../container/editProfileHandler";
import { submitProfile } from "../container/submitNewProfileHandler";
import api from "../redux/actions/apiAction";
import { clearForm } from "../redux/slices/formSlice";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { editProfileFormFields } from "../utils/editProfileFormFields";
import Sidebar from "./Sidebar";
import { GET } from "../constants";

const Profile = () => {
  const { formData } = useSelector((state) => state.formData);
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
        method: GET,
      };
      await dispatch(api({ name: "studentProfile", config }));
    };
    !studentProfile && fetch();
    return () => dispatch(clearForm());
  }, [dispatch, studentProfile]);

  // const editProfile = () => {
  //   setName(editedProfile?.name || studentProfile?.name);
  //   setIsEdit(true);
  // };

  // const submitProfile = async () => {
  //   const valid = validation(editProfileFormFields);
  //   if (valid) {
  //     setIsEdit(false);
  //     const config = {
  //       url: "student/studentProfile",
  //       method: "put",
  //       data: formData,
  //     };
  //     await dispatch(api({ name: "editedProfile", config }));
  //   }
  // };

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
              <Form formFields={editProfileFormFields} value={name} />
            ) : editedProfile ? (
              <h3>Name: {editedProfile?.name}</h3>
            ) : (
              <h3>Name: {studentProfile?.name}</h3>
            )}
          </>
        )
      )}

      <CustomButton
        onClick={() =>
          isEdit
            ? submitProfile({ setIsEdit, formData, dispatch })
            : editProfile({ setName, editedProfile, studentProfile, setIsEdit })
        }
        disabled={editLoader}
        text={isEdit ? "Submit" : editLoader ? "Updating..." : "Edit Profile"}
      />
    </div>
  );
};

export default Profile;
