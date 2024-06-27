export const passwordValidation = ({ newPassword, confirmPassword }) => {
  if (newPassword !== confirmPassword) {
    return "New Password and Confirm Password Not match.";
  }
};
