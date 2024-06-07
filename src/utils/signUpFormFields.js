export const signUpFormFields = [
  {
    type: "select",
    label: "Role",
    list: ["Student", "Teacher"],
    name: "role",
    isRequired: "Please Select Role.",
  },
  {
    type: "text",
    label: "Enter Name",
    name: "name",
    isRequired: "Please Enter Your Name.",
  },
  {
    type: "email",
    label: "Enter Email",
    name: "email",
    isRequired: "Please Enter Your Email.",
  },
  {
    type: "password",
    label: "Enter Password",
    name: "password",
    isRequired: "Please Enter Your Password.",
  },
];