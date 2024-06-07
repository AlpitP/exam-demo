import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({ text, ...rest }) => {
  return (
    <div style={{ paddingLeft: 100 }}>
      <Button variant="contained" {...rest}>
        {text}
      </Button>
    </div>
  );
};

export default CustomButton;
