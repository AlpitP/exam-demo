export const giveExamFormFields = ({ index, examData }) => {
  return [
    {
      type: "radio",
      name: `answer`,
      label: "A",
      id: "ans1",
      ans: examData?.exam?.[index - 1]?.options?.[0],
      checked: (value, compare) =>
        value === compare && compare ? true : false,
    },
    {
      type: "radio",
      name: `answer`,
      label: "B",
      id: "ans2",
      ans: examData?.exam?.[index - 1]?.options?.[1],
      checked: (value, compare) =>
        value === compare && compare ? true : false,
    },
    {
      type: "radio",
      name: `answer`,
      label: "C",
      id: "ans3",
      ans: examData?.exam?.[index - 1]?.options?.[2],
      checked: (value, compare) =>
        value === compare && compare ? true : false,
    },
    {
      type: "radio",
      name: `answer`,
      label: "D",
      id: "ans4",
      ans: examData?.exam?.[index - 1]?.options?.[3],
      checked: (value, compare) =>
        value === compare && compare ? true : false,
    },
  ];
};
