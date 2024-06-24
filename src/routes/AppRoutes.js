import { Fragment } from "react";
import { useRoutes } from "react-router-dom";
import AllExams from "../Student/AllExams";
import GiveExam from "../Student/GiveExam";
import Profile from "../Student/Profile";
import ResetPassword from "../Student/ResetPassword";
import AllStudents from "../Teacher/AllStudents";
import CreateExam from "../Teacher/CreateExam";
import EditExam from "../Teacher/EditExam";
import Student from "../Teacher/Student";
import ViewExam from "../Teacher/ViewExam";
import ErrorElement from "../components/ErrorElement";
import ForgotPassword from "../components/ForgotPassword";
import NewPassword from "../components/NewPassword";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import HomePage from "../dashboard/HomePage";
import AuthRoute from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import ViewResult from "../Student/ViewResult";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "*", element: <ErrorElement /> },
    {
      path: "/",
      element: <AuthRoute />,
      children: [
        { path: "sign-in", element: <SignIn /> },
        { path: "sign-up", element: <SignUp /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "newPassword", element: <NewPassword /> },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "teacher",
          element: <ProtectedRoute role="teacher" />,
          children: [
            { path: "", element: <HomePage /> },
            // { path: "create-exam", element: <CreateExam /> },
            { path: "create-exam/question1", element: <CreateExam id={1} /> },
            { path: "create-exam/question2", element: <CreateExam id={2} /> },
            { path: "create-exam/question3", element: <CreateExam id={3} /> },
            { path: "create-exam/question4", element: <CreateExam id={4} /> },
            { path: "create-exam/question5", element: <CreateExam id={5} /> },
            { path: "create-exam/question6", element: <CreateExam id={6} /> },
            { path: "create-exam/question7", element: <CreateExam id={7} /> },
            { path: "create-exam/question8", element: <CreateExam id={8} /> },
            { path: "create-exam/question9", element: <CreateExam id={9} /> },
            { path: "create-exam/question10", element: <CreateExam id={10} /> },
            { path: "create-exam/question11", element: <CreateExam id={11} /> },
            { path: "create-exam/question12", element: <CreateExam id={12} /> },
            { path: "create-exam/question13", element: <CreateExam id={13} /> },
            { path: "create-exam/question14", element: <CreateExam id={14} /> },
            { path: "create-exam/question15", element: <CreateExam id={15} /> },
            { path: "students", element: <AllStudents /> },
            { path: "viewStudentDetail", element: <Student /> },
            { path: "view-exam", element: <ViewExam /> },
            // { path: "examDetail/question1", element: <EditExam /> },
            { path: "editDetail/question1", element: <EditExam id={1} /> },
            { path: "editDetail/question2", element: <EditExam id={2} /> },
            { path: "editDetail/question3", element: <EditExam id={3} /> },
            { path: "editDetail/question4", element: <EditExam id={4} /> },
            { path: "editDetail/question5", element: <EditExam id={5} /> },
            { path: "editDetail/question6", element: <EditExam id={6} /> },
            { path: "editDetail/question7", element: <EditExam id={7} /> },
            { path: "editDetail/question8", element: <EditExam id={8} /> },
            { path: "editDetail/question9", element: <EditExam id={9} /> },
            { path: "editDetail/question10", element: <EditExam id={10} /> },
            { path: "editDetail/question11", element: <EditExam id={11} /> },
            { path: "editDetail/question12", element: <EditExam id={12} /> },
            { path: "editDetail/question13", element: <EditExam id={13} /> },
            { path: "editDetail/question14", element: <EditExam id={14} /> },
            { path: "editDetail/question15", element: <EditExam id={15} /> },

            { path: "viewExam/question1", element: <EditExam id={1} /> },
            { path: "viewExam/question2", element: <EditExam id={2} /> },
            { path: "viewExam/question3", element: <EditExam id={3} /> },
            { path: "viewExam/question4", element: <EditExam id={4} /> },
            { path: "viewExam/question5", element: <EditExam id={5} /> },
            { path: "viewExam/question6", element: <EditExam id={6} /> },
            { path: "viewExam/question7", element: <EditExam id={7} /> },
            { path: "viewExam/question8", element: <EditExam id={8} /> },
            { path: "viewExam/question9", element: <EditExam id={9} /> },
            { path: "viewExam/question10", element: <EditExam id={10} /> },
            { path: "viewExam/question11", element: <EditExam id={11} /> },
            { path: "viewExam/question12", element: <EditExam id={12} /> },
            { path: "viewExam/question13", element: <EditExam id={13} /> },
            { path: "viewExam/question14", element: <EditExam id={14} /> },
            { path: "viewExam/question15", element: <EditExam id={15} /> },
            { path: "resetPassword", element: <ResetPassword /> },
          ],
        },

        {
          path: "student",
          element: <ProtectedRoute role="student" />,
          children: [
            { path: "", element: <HomePage /> },
            { path: "Exams", element: <AllExams /> },
            { path: "view-result", element: <ViewResult /> },
            // { path: "give-exam", element: <GiveExam /> },
            { path: "give-exam/question1", element: <GiveExam id={1} /> },
            { path: "give-exam/question2", element: <GiveExam id={2} /> },
            { path: "give-exam/question3", element: <GiveExam id={3} /> },
            { path: "give-exam/question4", element: <GiveExam id={4} /> },
            { path: "give-exam/question5", element: <GiveExam id={5} /> },
            { path: "give-exam/question6", element: <GiveExam id={6} /> },
            { path: "give-exam/question7", element: <GiveExam id={7} /> },
            { path: "profile", element: <Profile /> },
            { path: "resetPassword", element: <ResetPassword /> },
          ],
        },
      ],
    },
  ]);

  return <Fragment>{routes}</Fragment>;
};
export default AppRoutes;
