import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChange, removeError } from "../redux/slices/formSlice";
import { objectKeys } from "../utils/javascript";
import { validation } from "../utils/validation";
import Input from "./Input";
import Radio from "./Radio";
import SelectOptions from "./Select";

const Form = ({ formFields, value, answer, setAnswer, ...rest }) => {
  const { formData, error } = useSelector((state) => state.formData);
  // const { error } = useSelector((state) => state.formData);
  const [inValid, setIsValid] = useState(false);
  // const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setAnswer && setAnswer(formData?.answer ?? rest?.currentQuestion?.answer);
    if (rest?.currentQuestion?.question?.length > 0) {
      dispatch(
        onChange({
          data:
            objectKeys(formData).length > 0 ? formData : rest?.currentQuestion,
        })
      );
    } else {
      dispatch(onChange({ data: "" }));
    }
    inValid && validation(formFields);
    formData?.answer && dispatch(removeError({ name: "error" }));
  }, [formData, formFields, inValid, rest]);

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
        const { name, label, list, type, disabled, id, text } = ele;
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
                  setAnswer(formData[id] ?? "");
                  dispatch(
                    changeHandler(e, {
                      name: "answer",
                      value: formData[id] ?? text ?? "",
                    })
                  );
                }}
                checked={formData[id] === answer && answer !== undefined}
                text={text}
                disabled={rest.type === "viewExam"}
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
                  ""
                }
                errorMessage={error[name]}
                onChange={(e) => dispatch(changeHandler(e))}
                disabled={disabled || rest.type === "viewExam"}
              />
            );
        }
      })}
    </div>
  );
};

export default Form;
