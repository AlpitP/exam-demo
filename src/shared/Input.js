import React from "react";

const Input = ({
  label,
  errorMessage,
  type,
  value,
  name,
  disabled,
  ...rest
}) => {
  return (
    <div style={inputStyle}>
      {label && <label>{label} :</label>}
      <input
        type={type}
        name={name}
        {...rest}
        value={value}
        readOnly={disabled}
      />
      <br />
      {errorMessage && (
        <span style={{ color: "red", fontSize: 13 }}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
const inputStyle = {
  width: "100%",
  marginBlock: 15,
};
