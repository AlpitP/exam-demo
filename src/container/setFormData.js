import { onChange } from "../redux/slices/formSlice";

export const setFormData = ({ dispatch, formData, data, index }) => {
  const options = {};
  for (let i = 0; i < 4; i++) {
    options[`ans${i + 1}`] = formData[`ans${i + 1}`];
  }
  dispatch(
    onChange({
      data: {
        subjectName: formData?.subjectName ?? data?.subjectName,
        question: formData?.question ?? data?.questions?.[index - 1]?.question,
        answer: formData?.answer ?? data?.questions?.[index - 1]?.answer,
        notes: formData?.notes ?? data?.notes?.[index - 1],
        ...options,
      },
    })
  );
};
