import { EMAIL } from "../constants";

export const forgotPasswordFormFields = [
  {
    type: "email",
    label: "Enter Email",
    name: "email",
    pattern: {
      value: EMAIL,
      message: "Please Enter Valid Email",
    },
    isRequired: "Please Enter Your Email.",
  },
];
