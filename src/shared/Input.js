import React from "react";

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <div style={inputStyle}>
      {label && <label>{label} :</label>}
      <input {...rest} />
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
