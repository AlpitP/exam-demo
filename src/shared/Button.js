import React from "react";

const CustomButton = ({ text, value, ...rest }) => {
  return (
    // <div style={{ paddingLeft: 100 }}>
    <button variant="contained" {...rest}>
      {value}
    </button>
    // </div>
  );
};

export default CustomButton;
