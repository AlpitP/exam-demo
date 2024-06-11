export const forgotPasswordFormFields = [
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
];
