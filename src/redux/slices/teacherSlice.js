import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examData: {
    subjectName: "",
    questions: [],
    notes: [],
  },
  currentQuestion: {},
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
        state.examData.questions = data ?? [];
        state.examData.notes = notes ?? [];
      } else {
        state.examData.subjectName = subjectName;
        state.examData.questions[currentQue - 1] = question;
        state.examData.notes[currentQue - 1] = note ? note : " ";
      }
    },
    currentQuestionFormData: (state, action) => {
      state.currentQuestion = action?.payload?.data;
    },
    clearExam: () => {
      return initialState;
    },
  },
});

export default teacherSlice.reducer;
export const { addQuestion, currentQuestionFormData, clearExam } =
  teacherSlice.actions;
