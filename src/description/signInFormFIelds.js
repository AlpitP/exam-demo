import { EMAIL, PASSWORD } from "../constants";

export const signInFormFields = [
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
  {
    type: "password",
    label: "Enter Password",
    name: "password",
    pattern: {
      value: PASSWORD,
      message: "Password must have more than 6 characters.",
    },
    isRequired: "Please Enter Your Password.",
  },
];
