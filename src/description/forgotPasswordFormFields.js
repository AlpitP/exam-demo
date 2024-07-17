import { emailPattern } from "./validation";

export const forgotPasswordFormFields = [
  {
    type: "email",
    label: "Enter Email",
    name: "email",
    pattern: emailPattern,
    isRequired: "Please Enter Your Email.",
  },
];
