import React from "react";

const Radio = ({ label, name, value, errorMessage, ...rest }) => {
  return (
    <div style={inputStyle}>
      {label && <label>{label} :</label>}
      <input type="radio" name={name} {...rest} value={value} />
      <br />
      {errorMessage && (
        <span style={{ color: "red", fontSize: 13 }}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Radio;
const inputStyle = {
  width: "100%",
  marginBlock: 15,
};
