import { Fragment, lazy } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import AllExams from "../Student/AllExams";
import GiveExam from "../Student/GiveExam";
// import Profile from "../Student/Profile";
import ResetPassword from "../Student/ResetPassword";
import AllStudents from "../Teacher/AllStudents";
import CreateExam from "../Teacher/CreateExam";
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
import EditExam from "../Teacher/EditExam";
const Profile = lazy(() => import("../Student/Profile"));

const AppRoutes = () => {
  const { search } = useLocation();
  console.log(search);
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
    { path: "/teacher/create-exam", element: <CreateExam /> },
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
            { path: "view-exam", element: <ViewExam /> },
            { path: "examDetail", element: <EditExam /> },
            { path: "resetPassword", element: <ResetPassword /> },
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
            { path: "resetPassword", element: <ResetPassword /> },
          ],
        },
      ],
    },
  ]);

  return <Fragment>{routes}</Fragment>;
};
export default AppRoutes;
