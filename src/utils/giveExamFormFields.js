export const giveExamFormFields = ({ index, examData }) => {
  return [
    {
      type: "radio",
      name: `opt1`,
      label: "A",
      id: "ans1",
      text: examData?.exam?.[index - 1]?.options?.[0],
    },
    {
      type: "radio",
      name: `opt2`,
      label: "B",
      id: "ans2",
      text: examData?.exam?.[index - 1]?.options?.[1],
    },
    {
      type: "radio",
      name: `opt3`,
      label: "C",
      id: "ans3",
      text: examData?.exam?.[index - 1]?.options?.[2],
    },
    {
      type: "radio",
      name: `opt4`,
      label: "D",
      id: "ans4",
      text: examData?.exam?.[index - 1]?.options?.[3],
    },
  ];
};
