import { TOTAL_OPTIONS } from "../constants";
import { radioCheckedCondition } from "../container/radioCheckedCondition";

export const giveExamFormFields = ({ index, examData }) => {
  const options = [];
  for (let i = 0; i < TOTAL_OPTIONS; i++) {
    options.push({
      type: "radio",
      name: "answer",
      id: `ans${i + 1}`,
      label: examData?.exam?.[index - 1]?.options?.[i],
      checked: radioCheckedCondition,
    });
  }
  return options;
  // return [
  //   {
  //     type: "radio",
  //     name: `answer`,
  //     id: "ans1",
  //     label: examData?.exam?.[index - 1]?.options?.[0],
  //     checked: radioCheckedCondition,
  //   },
  //   {
  //     type: "radio",
  //     name: `answer`,
  //     id: "ans2",
  //     label: examData?.exam?.[index - 1]?.options?.[1],
  //     checked: radioCheckedCondition,
  //   },
  //   {
  //     type: "radio",
  //     name: `answer`,
  //     id: "ans3",
  //     label: examData?.exam?.[index - 1]?.options?.[2],
  //     checked: radioCheckedCondition,
  //   },
  //   {
  //     type: "radio",
  //     name: `answer`,
  //     id: "ans4",
  //     label: examData?.exam?.[index - 1]?.options?.[3],
  //     checked: radioCheckedCondition,
  //   },
  // ];
};
