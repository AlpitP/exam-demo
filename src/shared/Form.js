import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChange } from "../redux/slices/formSlice";
import { validation } from "../utils/validation";
import Input from "./Input";
import SelectOptions from "./Select";
import Radio from "./Radio";

const Form = ({ formFields }) => {
  const { formData } = useSelector((state) => state.formData);
  const { examData } = useSelector((state) => state.teacher);
  const { error } = useSelector((state) => state.formData);
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    isValid && validation(formFields);
  });

  const changeHandler = (event) => {
    setIsValid(true);
    return (dispatch) => {
      const { name, value } = event.target;
      dispatch(onChange({ name, value }));
    };
  };

  return (
    <div>
      {formFields.map((ele, index) => {
        const { name, label, list, type, isRequired, disabled } = ele;
        switch (type) {
          case "select":
            return (
              <SelectOptions
                label={label}
                list={list}
                key={index}
                name={name}
                value={formData[name] || "select"}
                onChange={(e) => dispatch(changeHandler(e, isRequired))}
                errorMessage={error[name]}
              />
            );
          case "radio":
            return (
              <Radio
                label={label}
                key={index}
                name={name}
                value={formData[name] || examData[name] || ""}
                errorMessage={error[name]}
                onChange={(e) => dispatch(changeHandler(e))}
              />
            );
          default:
            return (
              <Input
                type={type}
                label={label}
                key={index}
                name={name}
                value={formData[name] || examData[name] || ""}
                errorMessage={error[name]}
                onChange={(e) => dispatch(changeHandler(e))}
                disabled={disabled}
              />
            );
        }
      })}
    </div>
  );
};

export default Form;
