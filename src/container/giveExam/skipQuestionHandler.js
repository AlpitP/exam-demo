import { removeError } from "../../redux/slices/formSlice";

export const skipQuestionHandler = ({
  dispatch,
  setIndex,
  index,
  navigate,
  search,
}) => {
  //   dispatch(
  //     onChange({
  //       data: {
  //         ans1: exam?.[index + 1]?.options?.[0],
  //         ans2: exam?.[index + 1]?.options?.[1],
  //         ans3: exam?.[index + 1]?.options?.[2],
  //         ans4: exam?.[index + 1]?.options?.[3],
  //         question: exam?.[index + 1]?.question,
  //         answer: examData?.questions?.[index + 1]?.answer,
  //       },
  //     })
  //   );
  setIndex((index) => (index += 1));
  dispatch(removeError({ name: "error" }));
  navigate(`/student/give-exam/question${index + 1}${search}`);
};