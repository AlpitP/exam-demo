import { Fragment } from "react";
import { useRoutes } from "react-router-dom";
import AllExams from "../Student/AllExams";
import GiveExam from "../Student/GiveExam";
import Profile from "../Student/Profile";
import ResetPassword from "../Student/ResetPassword";
import ViewResult from "../Student/ViewResult";
import AllStudents from "../Teacher/AllStudents";
import CreateExam from "../Teacher/CreateExam";
import EditExam from "../Teacher/EditExam";
import Student from "../Teacher/Student";
import ViewExam from "../Teacher/ViewExam";
import PageNotFound from "../components/PageNotFound";
import ForgotPassword from "../components/ForgotPassword";
import NewPassword from "../components/NewPassword";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import HomePage from "../dashboard/HomePage";
import AuthRoute from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "*", element: <PageNotFound /> },
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
      children: [
        {
          path: "teacher",
          element: <ProtectedRoute role="teacher" />,
          children: [
            { path: "", element: <HomePage /> },
            {
              path: "create-exam",
              children: [{ path: ":id", element: <CreateExam /> }],
            },
            { path: "students", element: <AllStudents /> },
            { path: "viewStudentDetail", element: <Student /> },
            { path: "view-exam", element: <ViewExam /> },
            {
              path: "editExam",
              children: [{ path: ":id", element: <EditExam /> }],
            },
            {
              path: "viewExam",
              children: [{ path: ":id", element: <EditExam /> }],
            },
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
            {
              path: "give-exam",
              children: [{ path: ":id", element: <GiveExam /> }],
            },
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
