import { EMAIL, NAME, PASSWORD } from "../constants";

export const signUpFormFields = [
  {
    type: "select",
    label: "Role",
    list: ["select", "student", "teacher"],
    name: "role",
    isRequired: "Please Select Your Role.",
  },
  {
    type: "text",
    label: "Enter Name",
    name: "name",
    pattern: {
      value: NAME,
      message: "Number and Special character not Allow.",
    },
    isRequired: "Please Enter Your Name.",
  },
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
