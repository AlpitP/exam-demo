import { useRoutes } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ForgotPassword from "../components/ForgotPassword";
import { Fragment } from "react";
import ErrorElement from "../components/ErrorElement";
import ProtectedRoute from "./ProtectedRoutes";
import NewPassword from "../components/NewPassword";
import HomePage from "../dashboard/HomePage";
import AllExams from "../Student/AllExams";
import GiveExam from "../Student/GiveExam";
import Profile from "../Student/Profile";
import AllStudents from "../Teacher/AllStudents";
import CreateExam from "../Teacher/CreateExam";
import Student from "../Teacher/Student";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "*", element: <ErrorElement /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/newPassword", element: <NewPassword /> },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "teacher",
          element: <ProtectedRoute role="teacher" />,
          children: [
            { path: "", element: <HomePage /> },
            { path: "students", element: <AllStudents /> },
            { path: "viewStudentDetail", element: <Student /> },
            { path: "create-exam", element: <CreateExam /> },
          ],
        },

        {
          path: "student",
          element: <ProtectedRoute role="student" />,
          children: [
            { path: "", element: <HomePage /> },
            { path: "Exams", element: <AllExams /> },
            { path: "give-exam", element: <GiveExam /> },
            { path: "profile", element: <Profile /> },
          ],
        },
      ],
    },
  ]);

  return <Fragment>{routes}</Fragment>;
};
export default AppRoutes;
