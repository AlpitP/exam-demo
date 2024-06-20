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
        data?.questions?.[type === "prev" ? index - 1 : index]?.question ?? "",
      ans1:
        data?.questions?.[type === "prev" ? index - 1 : index]?.options?.[0] ??
        "",
      ans2:
        data?.questions?.[type === "prev" ? index - 1 : index]?.options?.[1] ??
        "",
      ans3:
        data?.questions?.[type === "prev" ? index - 1 : index]?.options?.[2] ??
        "",
      ans4:
        data?.questions?.[type === "prev" ? index - 1 : index]?.options?.[3] ??
        "",
      answer:
        data?.questions?.[type === "prev" ? index - 1 : index]?.answer ?? "",
      notes: data?.notes?.[type === "prev" ? index - 1 : index] ?? "",
    };
  });
};
