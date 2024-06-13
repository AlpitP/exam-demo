import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChange } from "../redux/slices/formSlice";
import { validation } from "../utils/validation";
import Input from "./Input";
import Radio from "./Radio";
import SelectOptions from "./Select";

const Form = ({ formFields, ...rest }) => {
  const { formData } = useSelector((state) => state.formData);
  const { examData } = useSelector((state) => state.teacher);
  const { error } = useSelector((state) => state.formData);
  const [isValid, setIsValid] = useState(false);
  const [ans, setAns] = useState(examData?.questions?.[rest.index]?.ans ?? "");

  const dispatch = useDispatch();
  useEffect(() => {
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
        const { name, label, list, type, disabled, id } = ele;
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
                  setAns(formData[id]);
                  dispatch(
                    changeHandler(e, {
                      name: "ans",
                      value: formData[id],
                    })
                  );
                }}
                checked={
                  formData[id] === ans && ans !== "" && ans !== undefined
                }
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
                  rest?.currentQuestion?.[name] ??
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
