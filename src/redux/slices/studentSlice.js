import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exam: {
    exam: [],
    questions: [],
  },
};
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addExam: (state, action) => {
      const { data } = action.payload;
      state.exam.exam.push(data);
    },
    addAnswer: (state, action) => {
      const { data, index } = action.payload;
      state.exam.questions[index] = data;
    },
  },
});

export default studentSlice.reducer;
export const { addExam, addAnswer } = studentSlice.actions;
