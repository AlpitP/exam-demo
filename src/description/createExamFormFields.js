import { TOTAL_OPTIONS } from "../constants";
import { radioCheckedCondition } from "../container/radioCheckedCondition";

export const createExamFormFields = (index) => {
  const options = [];
  for (let i = 0; i < TOTAL_OPTIONS; i++) {
    options.push(
      {
        type: "radio",
        name: "answer",
        label: `${String.fromCharCode(65 + i)}`,
        id: `ans${i + 1}`,
        checked: radioCheckedCondition,
      },
      {
        type: "text",
        name: `ans${i + 1}`,
        label: `Opt ${i + 1}`,
        isRequired: `Please Enter Option ${i + 1}.`,
        customValidations: ({ options }) => {
          if (Array.from(new Set(options)).length !== options.length) {
            return "Not Add Same Options.";
          }
        },
      }
    );
  }
  return [
    {
      type: "text",
      name: "subjectName",
      label: "Subject",
      readonly: index !== 0,
      isRequired: index === 0 && "Please Enter Subject.",
    },
    {
      type: "text",
      name: "question",
      label: `Question ${index + 1}`,
      isRequired: "Please Enter Question.",
      customValidations: ({ compareQuestionsArray, question }) => {
        const questionIndex = compareQuestionsArray?.findIndex(
          (ele) => ele?.question === question
        );
        if (
          compareQuestionsArray[questionIndex]?.question === question &&
          questionIndex !== index
        ) {
          return "You can not Add Same Questions.";
        }
      },
    },
    ...options,
    {
      type: "text",
      name: "notes",
      label: "Note",
    },

    // {
    //   type: "radio",
    //   name: "answer",
    //   label: "A",
    //   id: "ans1",
    //   checked: radioCheckedCondition,
    // },
    // {
    //   type: "text",
    //   name: "ans1",
    //   label: "Opt 1 ",
    //   isRequired: "Please Enter Option1.",
    //   customValidations: ({ opt1, opt2, opt3, opt4 }) => {
    //     if (opt1 === opt2 || opt1 === opt3 || opt1 === opt4) {
    //       return "Not Add Same Options.";
    //     }
    //   },
    // },

    // {
    //   type: "radio",
    //   name: "answer",
    //   label: "B",
    //   id: "ans2",
    //   checked: radioCheckedCondition,
    // },
    // {
    //   type: "text",
    //   name: "ans2",
    //   label: "Opt 2",
    //   isRequired: "Please Enter Option2.",
    //   customValidations: ({ opt1, opt2, opt3, opt4 }) => {
    //     if (opt2 === opt1 || opt2 === opt3 || opt2 === opt4) {
    //       return "Not Add Same Options.";
    //     }
    //   },
    // },

    // {
    //   type: "radio",
    //   name: "answer",
    //   label: "C",
    //   id: "ans3",
    //   checked: radioCheckedCondition,
    // },
    // {
    //   type: "text",
    //   name: "ans3",
    //   label: "Opt 3",
    //   isRequired: "Please Enter Option3.",
    //   customValidations: ({ opt1, opt2, opt3, opt4 }) => {
    //     if (opt3 === opt2 || opt3 === opt1 || opt3 === opt4) {
    //       return "Not Add Same Options.";
    //     }
    //   },
    // },

    // {
    //   type: "radio",
    //   name: "answer",
    //   label: "D",
    //   id: "ans4",
    //   checked: radioCheckedCondition,
    // },
    // {
    //   type: "text",
    //   name: "ans4",
    //   label: "Opt 4",
    //   isRequired: "Please Enter Option4.",
    //   customValidations: ({ opt1, opt2, opt3, opt4 }) => {
    //     if (opt4 === opt2 || opt4 === opt3 || opt4 === opt1) {
    //       return "Not Add Same Options.";
    //     }
    //   },
    // },
  ];
};
