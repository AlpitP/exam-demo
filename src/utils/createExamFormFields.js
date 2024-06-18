export const createExamFormFields = (index) => {
  return [
    {
      type: "text",
      name: "subjectName",
      label: "Subject",
      disabled: index === 0 ? false : true,
      isRequired: index === 0 && "Please Enter Subject.",
    },
    {
      type: "text",
      name: "question",
      label: `Question ${index + 1}`,
      isRequired: "Please Enter Question.",
      customValidations: ({ compareQuestionsArray, question }) => {
        if (
          compareQuestionsArray?.find((ele) => ele?.question === question) &&
          compareQuestionsArray?.findIndex(
            (ele) => ele?.question === question
          ) !== index
        ) {
          return "You can not Add Same Questions.";
        }
      },
    },
    { type: "radio", name: "opt1", label: "A", id: "ans1" },
    {
      type: "text",
      name: "ans1",
      label: "Opt 1 ",
      isRequired: "Please Enter Option1.",
      customValidations: ({ opt1, opt2, opt3, opt4 }) => {
        if (opt1 === opt2 || opt1 === opt3 || opt1 === opt4) {
          return "Not Add Same Options.";
        }
      },
    },

    { type: "radio", name: "otp2", label: "B", id: "ans2" },
    {
      type: "text",
      name: "ans2",
      label: "Opt 2",
      isRequired: "Please Enter Option2.",
      customValidations: ({ opt1, opt2, opt3, opt4 }) => {
        if (opt2 === opt1 || opt2 === opt3 || opt2 === opt4) {
          return "Not Add Same Options.";
        }
      },
    },

    { type: "radio", name: "opt3", label: "C", id: "ans3" },
    {
      type: "text",
      name: "ans3",
      label: "Opt 3",
      isRequired: "Please Enter Option3.",
      customValidations: ({ opt1, opt2, opt3, opt4 }) => {
        if (opt3 === opt2 || opt3 === opt1 || opt3 === opt4) {
          return "Not Add Same Options.";
        }
      },
    },

    { type: "radio", name: "opt4", label: "D", id: "ans4" },
    {
      type: "text",
      name: "ans4",
      label: "Opt 4",
      isRequired: "Please Enter Option4.",
      customValidations: ({ opt1, opt2, opt3, opt4 }) => {
        if (opt4 === opt2 || opt4 === opt3 || opt4 === opt1) {
          return "Not Add Same Options.";
        }
      },
    },

    {
      type: "text",
      name: "notes",
      label: "Note",
    },
  ];
  // if (index === 0) {
  //   return [
  //     {
  //       type: "text",
  //       name: "subjectName",
  //       label: "Subject",
  //       // isRequired: "Please Enter Subject.",
  //     },
  //     {
  //       type: "text",
  //       name: "question",
  //       label: `Question ${index + 1}`,
  //       // isRequired: "Please Enter Question.",
  //     },
  //     { type: "radio", name: "opt", label: "A" },
  //     { type: "text", name: "ans1", label: "Ans 1 " },
  //     { type: "radio", name: "opt", label: "B" },
  //     { type: "text", name: "ans2", label: "Ans 2" },
  //     { type: "radio", name: "opt", label: "C" },
  //     { type: "text", name: "ans3", label: "Ans 3" },
  //     { type: "radio", name: "opt", label: "D" },
  //     { type: "text", name: "ans4", label: "Ans 4" },
  //     {
  //       type: "text",
  //       name: "notes",
  //       label: "Note",
  //       // isRequired: "Please Enter Note.",
  //     },
  //   ];
  // } else if (index > 0 && index <= 14) {
  //   return [
  //     {
  //       type: "text",
  //       name: "subjectName",
  //       label: "Subject",
  //       disabled: true,
  //     },
  //     {
  //       type: "text",
  //       name: "question",
  //       label: `Question ${index + 1}`,
  //       // isRequired: "Please Enter Question.",
  //     },
  //     { type: "radio", name: "opt", label: "A" },
  //     { type: "text", name: "ans1", label: "Ans 1 " },
  //     { type: "radio", name: "opt", label: "B" },
  //     { type: "text", name: "ans2", label: "Ans 2" },
  //     { type: "radio", name: "opt", label: "C" },
  //     { type: "text", name: "ans3", label: "Ans 3" },
  //     { type: "radio", name: "opt", label: "D" },
  //     { type: "text", name: "ans4", label: "Ans 4" },
  //     {
  //       type: "text",
  //       name: "notes",
  //       label: "Note",
  //       disabled: true,
  //     },
  //   ];
  // }
};
