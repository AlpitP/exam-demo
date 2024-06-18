export const giveExamFormFields = ({ index, exam }) => {
  return [
    {
      type: "radio",
      name: `opt1`,
      label: "A",
      id: "ans1",
      text: exam?.[index]?.options?.[0],
    },
    {
      type: "radio",
      name: `opt2`,
      label: "B",
      id: "ans2",
      text: exam?.[index]?.options?.[1],
    },
    {
      type: "radio",
      name: `opt3`,
      label: "C",
      id: "ans3",
      text: exam?.[index]?.options?.[2],
    },
    {
      type: "radio",
      name: `opt4`,
      label: "D",
      id: "ans4",
      text: exam?.[index]?.options?.[3],
    },
  ];
};
