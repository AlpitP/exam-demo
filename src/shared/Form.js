import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChange, removeError, setError } from "../redux/slices/formSlice";
import Input from "./Input";
import SelectOptions from "./Select";

const Form = ({ formFields, ...rest }) => {
  const { formData } = useSelector((state) => state.formData);
  const { examData } = useSelector((state) => state.teacher);
  const { error } = useSelector((state) => state.formData);
  console.log(rest.id);

  const dispatch = useDispatch();

  const changeHandler = (event, error) => {
    return (dispatch) => {
      const { name, value } = event.target;
      dispatch(onChange({ name, value }));
      if (value.length === 0) {
        dispatch(setError({ name, error }));
      } else {
        dispatch(removeError({ name }));
      }
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

          default:
            return (
              <Input
                type={type}
                label={label}
                key={index}
                name={name}
                value={formData[name] || examData[name] || ""}
                errorMessage={error[name]}
                onChange={(e) => dispatch(changeHandler(e, isRequired))}
                disabled={disabled}
              />
            );
        }
      })}
    </div>
  );
};

export default Form;
