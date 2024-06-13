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
    editQuestion: (state, action) => {
      const { currentQue, question, note } = action.payload;
      state.examData?.questions.splice(currentQue, 1, question);
      note && state.examData?.notes.splice(currentQue, 1, note);
    },
  },
});

export default teacherSlice.reducer;
export const { addExam, addQuestion, editQuestion } = teacherSlice.actions;
