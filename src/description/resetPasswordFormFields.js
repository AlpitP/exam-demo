import { passwordValidation } from "../container/passwordValidation";
import { passwordPattern } from "./validation";

export const resetPasswordFormFields = [
  {
    type: "password",
    label: "Enter Old Password",
    name: "oldPassword",
    isRequired: "Please Enter Old Password",
    pattern: passwordPattern,
  },
  {
    type: "password",
    label: "Enter New Password",
    name: "Password",
    isRequired: "Please Enter New Password",
    pattern: passwordPattern,
  },
  {
    type: "password",
    label: "Confirm Password",
    name: "ConfirmPassword",
    isRequired: "Please Enter Confirm Password",
    pattern: passwordPattern,
    customValidations: passwordValidation,
  },
];
