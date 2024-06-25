import React from "react";

const Radio = ({ label, name, value, errorMessage, ans, ...rest }) => {
  return (
    <div>
      {label && <label>{label} :</label>}
      <input type="radio" name={name} {...rest} value={value} />
      {ans && <span>{ans}</span>}

      {errorMessage && (
        <span style={{ color: "red", fontSize: 13 }}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Radio;
