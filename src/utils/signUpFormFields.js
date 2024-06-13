export const signUpFormFields = [
  {
    type: "select",
    label: "Role",
    list: ["student", "teacher"],
    name: "role",
    isRequired: "Please Select Your Role.",
  },
  {
    type: "text",
    label: "Enter Name",
    name: "name",
    pattern: {
      value: /^[a-zA-Z]*$/,
      message: "Number and Special character not Allow.",
    },
    isRequired: "Please Enter Your Name.",
  },
  {
    type: "email",
    label: "Enter Email",
    name: "email",
    pattern: {
      value: /^[a-z0-9A-Z]+@[a-z]+\.[a-z]{2,3}$/,
      message: "Please Enter Valid Email",
    },
    isRequired: "Please Enter Your Email.",
  },
  {
    type: "password",
    label: "Enter Password",
    name: "password",
    pattern: {
      value: /^[a-zA-Z0-9@]{6,}$/,
      message: "Password must have more than 6 characters.",
    },
    isRequired: "Please Enter Your Password.",
  },
];
