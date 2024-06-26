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
    setQuestion: (state, action) => {
      const { question, note, currentQue, subjectName, data, notes } =
        action.payload;
      state.examData.subjectName = subjectName;
      if (data) {
        state.examData.questions = data ?? [];
        state.examData.notes = notes ?? [];
      } else {
        state.examData.questions[currentQue - 1] = question;
        state.examData.notes[currentQue - 1] = note ? note : " ";
      }
    },
    setCurrentQuestionFormData: (state, action) => {
      const { data } = action?.payload;
      state.currentQuestion = data;
    },
    clearExam: () => {
      return initialState;
    },
  },
});

export default teacherSlice.reducer;
export const { setQuestion, setCurrentQuestionFormData, clearExam } =
  teacherSlice.actions;
