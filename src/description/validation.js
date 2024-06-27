import { EMAIL_PATTERN, NAME_PATTERN, PASSWORD_PATTERN } from "../constants";

export const passwordPattern = {
  value: PASSWORD_PATTERN,
  message: "Password must have more than 6 characters.",
};

export const namePattern = {
  value: NAME_PATTERN,
  message: "Number and Special character not Allow.",
};

export const emailPattern = {
  value: EMAIL_PATTERN,
  message: "Please Enter Valid Email",
};
