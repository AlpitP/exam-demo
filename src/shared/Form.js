import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChange, setError } from "../redux/formSlice";
import Input from "./Input";
import SelectOptions from "./Select";

const Form = ({ formFields }) => {
  const { formData } = useSelector((state) => state.formData);
  const error = useSelector((state) => state.formData);
  console.log(error);
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    dispatch(onChange({ name, value }));
  };

  return (
    <div>
      {formFields.map((ele, index) => {
        const { name, label, list, type } = ele;
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
              />
            );
          default:
            return (
              <Input
                type={type}
                label={label}
                key={index}
                name={name}
                value={formData[name]}
                onChange={(e) =>
                  dispatch(onChange({ name: name, value: e.target.value }))
                }
              />
            );
        }
      })}
    </div>
  );
};

export default Form;
