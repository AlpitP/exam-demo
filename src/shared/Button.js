import React from "react";

const CustomButton = ({ value, ...rest }) => {
  return <button {...rest}>{value}</button>;
};

export default CustomButton;
