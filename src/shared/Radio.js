import React from "react";

const Radio = ({ label, name, value, errorMessage, ...rest }) => {
  return (
    <div>
      {label && <label>{label} :</label>}
      <input type="radio" name={name} {...rest} value={value} />
      {errorMessage && (
        <span style={{ color: "red", fontSize: 13 }}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Radio;
