import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChange } from "../redux/slices/formSlice";
import { validation } from "../utils/validation";
import Input from "./Input";
import Radio from "./Radio";
import SelectOptions from "./Select";

const Form = ({ formFields, disable }) => {
  const { formData, error } = useSelector((state) => state.formData);
  const [checkValidation, setCheckValidation] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    checkValidation && validation(formFields);
  }, [formData, checkValidation]);

  const changeHandler = (event) => {
    setCheckValidation(true);
    const { name, value } = event.target;
    dispatch(onChange({ name, value }));
  };
  return (
    <div>
      {formFields.map((ele, index) => {
        const { name, label, list, type, readonly, id, ans, checked } = ele;
        switch (type) {
          case "select":
            return (
              <SelectOptions
                label={label}
                list={list}
                key={index}
                name={name}
                value={formData[name]}
                onChange={changeHandler}
                errorMessage={error[name]}
                disabled={disable}
              />
            );
          case "radio":
            return (
              <Radio
                label={label}
                key={index}
                name={name}
                value={formData[id]}
                onChange={changeHandler}
                checked={checked(formData[id], formData[name])}
                ans={ans}
                disabled={disable}
              />
            );
          default:
            return (
              <Input
                type={type}
                label={label}
                key={index}
                name={name}
                value={formData?.[name] ?? ""}
                readOnly={readonly}
                errorMessage={error[name]}
                onChange={changeHandler}
                disabled={disable}
              />
            );
        }
      })}
    </div>
  );
};

export default Form;
