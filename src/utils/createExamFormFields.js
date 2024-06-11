export const createExamFormFields = (index) => {
  if (index === 0) {
    return [
      {
        type: "text",
        name: "subjectName",
        label: "Subject",
        isRequired: "Please Enter Subject.",
      },
      {
        type: "text",
        name: "question",
        label: "Question 1",
        isRequired: "Please Enter Question.",
      },
      { type: "radio", name: "opt1", label: "A" },
      { type: "text", name: "ans1", label: "Ans 1 " },

      { type: "radio", name: "opt2", label: "B" },
      { type: "text", name: "ans2", label: "Ans 2" },

      { type: "radio", name: "opt3", label: "C" },
      { type: "text", name: "ans3", label: "Ans 3" },

      { type: "radio", name: "opt4", label: "D" },
      { type: "text", name: "ans4", label: "Ans 4" },
      {
        type: "text",
        name: "notes",
        label: "Note",
        isRequired: "Please Enter Note.",
      },
    ];
  } else if (index > 0 && index <= 14) {
    return [
      {
        type: "text",
        name: "subjectName",
        label: "Subject",
        disabled: true,
      },
      {
        type: "text",
        name: "question",
        label: "Question 1",
        isRequired: "Please Enter Question.",
      },
      { type: "radio", name: "opt1", label: "A" },
      { type: "text", name: "ans1", label: "Ans 1 " },

      { type: "radio", name: "opt2", label: "B" },
      { type: "text", name: "ans2", label: "Ans 2" },

      { type: "radio", name: "opt3", label: "C" },
      { type: "text", name: "ans3", label: "Ans 3" },

      { type: "radio", name: "opt4", label: "D" },
      { type: "text", name: "ans4", label: "Ans 4" },
      {
        type: "text",
        name: "notes",
        label: "Note",
        disabled: true,
      },
    ];
  }
};
