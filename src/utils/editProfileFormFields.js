export const editProfileFormFields = [
  {
    type: "text",
    label: "Name",
    name: "name",
    pattern: {
      value: /^[a-zA-Z]*$/,
      message: "Number and Special character not Allow.",
    },
    isRequired: "Please Enter Your Name.",
  },
];
