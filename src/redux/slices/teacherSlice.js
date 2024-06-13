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
      const { question, note } = action.payload;
      state.examData?.questions.push(question);
      note && state.examData?.notes.push(note);
    },
  },
});

export default teacherSlice.reducer;
export const { addExam, addQuestion } = teacherSlice.actions;
