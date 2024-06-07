import { MenuItem, Select } from "@mui/material";
import React from "react";

const SelectOptions = ({ label, list, name, value, ...rest }) => {
  return (
    <div>
      {label && (
        <label style={{ display: "inline-block", paddingTop: 16 }}>
          {label} :
        </label>
      )}
      <Select
        {...rest}
        name={name}
        value={value}
        variant="standard"
        sx={{ m: 1, minWidth: 120 }}
      >
        <MenuItem value={""} disabled>
          Select
        </MenuItem>
        {list &&
          list.map((ele, index) => {
            return (
              <MenuItem value={ele} key={index}>
                {ele}
              </MenuItem>
            );
          })}
      </Select>
    </div>
  );
};

export default SelectOptions;
