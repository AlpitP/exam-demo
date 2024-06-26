import { PASSWORD } from "../constants";

export const resetPasswordFormFields = [
  {
    type: "password",
    label: "Enter Old Password",
    name: "oldPassword",
    isRequired: "Please Enter Old Password",
    pattern: {
      value: PASSWORD,
      message: "Password must have more than 6 characters.",
    },
  },
  {
    type: "password",
    label: "Enter New Password",
    name: "Password",
    isRequired: "Please Enter New Password",
    pattern: {
      value: PASSWORD,
      message: "Password must have more than 6 characters.",
    },
  },
  {
    type: "password",
    label: "Confirm Password",
    name: "ConfirmPassword",
    isRequired: "Please Enter Confirm Password",
    pattern: {
      value: PASSWORD,
      message: "Password must have more than 6 characters.",
    },
    customValidations: ({ password, oldPassword }) => {
      if (password !== oldPassword) {
        return "New Password and Confirm Password Not match.";
      }
    },
  },
];
