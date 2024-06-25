import React from "react";

const SelectOptions = ({ label, list, name, value, errorMessage, ...rest }) => {
  return (
    <div style={inputStyle}>
      {label && (
        <label style={{ display: "inline-block", paddingTop: 5 }}>
          {label} :
        </label>
      )}
      <select {...rest} name={name} value={value}>
        {list &&
          list.map((ele, index) => {
            return (
              <option value={ele === "select" ? "" : ele} key={index}>
                {ele}
              </option>
            );
          })}
      </select>
      {errorMessage && (
        <span style={{ color: "red", fontSize: 13 }}>{errorMessage}</span>
      )}
    </div>
  );
};

export default SelectOptions;
const inputStyle = {
  width: "100%",
  marginBlock: 15,
};
