import React from "react";

const Radio = ({ label, errorMessage, ...rest }) => {
  return (
    <div>
      {label && <label>{label} :</label>}
      <input type="radio" {...rest} />

      {errorMessage && (
        <span style={{ color: "red", fontSize: 13 }}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Radio;
