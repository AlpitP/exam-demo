import { passwordPattern, namePattern, emailPattern } from "./validation";

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
    pattern: namePattern,
    isRequired: "Please Enter Your Name.",
  },
  {
    type: "email",
    label: "Enter Email",
    name: "email",
    pattern: emailPattern,
    isRequired: "Please Enter Your Email.",
  },
  {
    type: "password",
    label: "Enter Password",
    name: "password",
    pattern: passwordPattern,
    isRequired: "Please Enter Your Password.",
  },
];
