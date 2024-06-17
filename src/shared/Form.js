import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChange } from "../redux/slices/formSlice";
import { validation } from "../utils/validation";
import Input from "./Input";
import Radio from "./Radio";
import SelectOptions from "./Select";

const Form = ({ formFields, value, ...rest }) => {
  const { formData } = useSelector((state) => state.formData);
  // const { examData } = useSelector((state) => state.teacher);
  const { error } = useSelector((state) => state.formData);
  const [isValid, setIsValid] = useState(false);
  let answer = formData?.answer ?? "";
  const dispatch = useDispatch();

  useEffect(() => {
    answer = formData?.answer;
    isValid && validation(formFields);
  });

  const changeHandler = (event, data) => {
    setIsValid(true);

    return (dispatch) => {
      const { name, value } = event.target;
      dispatch(onChange(data ?? { name, value }));
    };
  };

  return (
    <div>
      {formFields.map((ele, index) => {
        const { name, label, list, type, disabled, id, text, error } = ele;
        console.log(formData[id]);
        switch (type) {
          case "select":
            return (
              <SelectOptions
                label={label}
                list={list}
                key={index}
                name={name}
                value={formData[name] || "select"}
                onChange={(e) => dispatch(changeHandler(e))}
                errorMessage={error[name]}
              />
            );
          case "radio":
            return (
              <Radio
                label={label}
                key={index}
                name={name}
                onChange={(e) => {
                  answer = formData[name];
                  dispatch(
                    changeHandler(e, {
                      name: "answer",
                      value: formData[id] ?? text,
                    })
                  );
                }}
                checked={
                  formData[id] === answer &&
                  answer !== "" &&
                  answer !== undefined
                }
                text={text}
              />
            );
          default:
            return (
              <Input
                type={type}
                label={label}
                key={index}
                name={name}
                value={
                  formData[name] ??
                  value ??
                  // rest?.currentQuestion?.[name] ??
                  // examData[name] ??
                  ""
                }
                errorMessage={error?.[name]}
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
