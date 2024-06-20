export const previousHandler = ({
  setIndex,
  index,
  navigate,
  type,
  search,
}) => {
  setIndex((index) => index - 1);
  // currentQuestionHandler({
  //   setCurrentQuestion,
  //   index,
  //   data,
  //   type: "prev",
  //   subjectName,
  // });
  type === "editExam"
    ? navigate(`/teacher/examDetail/question${index - 1}${search}`)
    : navigate(`/teacher/create-exam/question${index - 1}`);
};
