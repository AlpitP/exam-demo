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
      state.examData?.questions.push(action.payload);
    },
  },
});

export default teacherSlice.reducer;
export const { addExam, addQuestion } = teacherSlice.actions;
