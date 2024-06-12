export const editProfile = ({
  setName,
  editedProfile,
  studentProfile,
  setIsEdit,
}) => {
  setName(editedProfile?.name || studentProfile?.name);
  setIsEdit(true);
};
