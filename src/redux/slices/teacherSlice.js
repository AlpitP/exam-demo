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
    addExam: (state, action) => {
      state.examData = action.payload;
    },
    addQuestion: (state, action) => {
      console.log(action);
      const { question, note, currentQue, subjectName } = action.payload;
      state.examData.subjectName = subjectName;
      state.examData.questions[currentQue] = question;
      state.examData.notes[currentQue] = note ? note : " ";
    },
    editQuestion: (state, action) => {
      console.log(action);
      const { currentQue, question, note, subjectName } = action.payload;

      state.examData.subjectName = subjectName;
      state.examData.questions[currentQue] = question;
      state.examData.notes[currentQue] = note;
      // state.examData?.questions.splice(currentQue, 1, question);
      // note && state.examData?.notes.splice(currentQue, 1, note);
    },
  },
});

export default teacherSlice.reducer;
export const { addExam, addQuestion, editQuestion } = teacherSlice.actions;
