import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examData: {
    subjectName: "",
    questions: [],
    notes: [],
  },
};
const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      const { question, note, currentQue, subjectName, data, notes } =
        action.payload;
      if (data) {
        state.examData.subjectName = subjectName;
        state.examData.questions = data;
        state.examData.notes = notes;
      } else {
        state.examData.subjectName = subjectName;
        state.examData.questions[currentQue] = question;
        state.examData.notes[currentQue] = note ? note : " ";
      }
    },
  },
});

export default teacherSlice.reducer;
export const { addQuestion } = teacherSlice.actions;
