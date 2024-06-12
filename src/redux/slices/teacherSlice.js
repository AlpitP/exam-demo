import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examData: {},
};
const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    addExam: (state, action) => {
      state.examData = action.payload;
    },
    addQuestion: (state, action) => {
      const { subjectName, question, note } = action.payload;
      state.examData?.questions.push(question);
      state.examData.subjectName = subjectName ?? state.examData.subjectName;
      note && state.examData?.notes.push(note);
    },
  },
});

export default teacherSlice.reducer;
export const { addExam, addQuestion } = teacherSlice.actions;
