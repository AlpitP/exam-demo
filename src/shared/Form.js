import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearForm, onChange, setError } from "../redux/slices/formSlice";
import { validation } from "../utils/validation";
import Input from "./Input";
import Radio from "./Radio";
import SelectOptions from "./Select";
import store from "../redux/store/store";
import { objectKeys } from "../utils/javascript";
import { isRejected } from "@reduxjs/toolkit";

const Form = ({ formFields, value, ...rest }) => {
  const { formData } = useSelector((state) => state.formData);
  // const { examData } = useSelector((state) => state.teacher);
  const { error } = useSelector((state) => state.formData);
  const [isValid, setIsValid] = useState(false);
  // let answer = formData?.answer ?? "";
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setAnswer(formData?.answer ?? rest?.currentQuestion?.answer);
    rest?.currentQuestion?.question?.length > 0
      ? dispatch(
          onChange({
            data:
              objectKeys(formData).length > 0
                ? formData
                : rest?.currentQuestion,
          })
        )
      : dispatch(onChange({ data: "" }));

    // answer = rest?.currentQuestion?.answer ?? formData?.answer;
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
        const { name, label, list, type, disabled, id, text, isRequired } = ele;
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
                  // answer = formData[name];
                  setAnswer(formData[name] ?? "");
                  dispatch(
                    changeHandler(e, {
                      name: "answer",
                      value: id ?? text ?? "",
                    })
                  );
                }}
                checked={id === answer}
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
                  formData?.[name] ??
                  rest?.currentQuestion?.[name] ??
                  value ??
                  // examData[name] ??
                  ""
                }
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
