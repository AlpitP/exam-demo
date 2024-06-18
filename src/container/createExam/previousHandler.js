import { currentQuestionHandler } from "../createExamHandlers";

export const previousHandler = ({
  setIndex,
  setCurrentQuestion,
  index,
  data,
  subjectName,
}) => {
  setIndex((index) => index - 1);
  currentQuestionHandler({
    setCurrentQuestion,
    index,
    data,
    type: "prev",
    subjectName,
  });
};
