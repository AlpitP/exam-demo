export const newPasswordFormFields = [
  {
    type: "password",
    label: "Enter New Password",
    name: "Password",
    isRequired: "Please Enter New Password",
    pattern: {
      value: /^[a-zA-Z0-9@]{6,}$/,
      message: "Password must have more than 6 characters.",
    },
  },
  {
    type: "password",
    label: "Confirm Password",
    name: "ConfirmPassword",
    isRequired: "Please Enter Confirm Password",
    pattern: {
      value: /^[a-zA-Z0-9@]{6,}$/,
      message: "Password must have more than 6 characters.",
    },
    customValidations: ({ value, compare }) => {
      if (value !== compare) {
        return "New Password and Confirm Password Not match.";
      }
    },
  },
];
