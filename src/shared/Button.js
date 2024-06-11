import React from "react";

const CustomButton = ({ text, ...rest }) => {
  return (
    // <div style={{ paddingLeft: 100 }}>
    <button variant="contained" {...rest}>
      {text}
    </button>
    // </div>
  );
};

export default CustomButton;
