import { TextField } from "@mui/material";
import React from "react";

const Input = ({ label, errorMessage, value, name, ...rest }) => {
  return (
    <div style={inputStyle}>
      {label && (
        <label style={{ display: "inline-block", paddingTop: 16 }}>
          {label} :
        </label>
      )}
      <TextField
        variant="filled"
        label={label}
        name={name}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default Input;
const inputStyle = {
  width: "100%",
  marginBlock: 10,
};
