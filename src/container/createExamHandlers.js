export const currentQuestionHandler = ({
  setCurrentQuestion,
  index,
  data,
  type,
  subjectName,
}) => {
  setCurrentQuestion((currentQuestion) => {
    return {
      ...currentQuestion,
      subjectName: subjectName ?? "",
      question:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]?.question ??
        "",
      ans1:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]
          ?.options?.[0] ?? "",
      ans2:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]
          ?.options?.[1] ?? "",
      ans3:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]
          ?.options?.[2] ?? "",
      ans4:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]
          ?.options?.[3] ?? "",
      answer:
        data?.questions?.[type === "prev" ? index - 1 : index + 1]?.answer ??
        "",
      notes: data?.notes?.[type === "prev" ? index - 1 : index + 1] ?? "",
    };
  });
};
