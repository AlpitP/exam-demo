import { passwordPattern, emailPattern } from "./validation";

export const signInFormFields = [
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
