import React from "react";

const CustomButton = ({ ...rest }) => {
  return <button {...rest}>{rest.value}</button>;
};

export default CustomButton;
