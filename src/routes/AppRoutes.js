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
import ForgotPassword from "../components/ForgotPassword";
import NewPassword from "../components/NewPassword";
import PageNotFound from "../components/PageNotFound";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import HomePage from "../dashboard/HomePage";
import AuthRoute from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import { userRole } from "../description/role.enums";
import Layout from "../dashboard/Layout";

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
      element: <Layout />,
      children: [
        {
          path: "teacher",
          element: <ProtectedRoute role={userRole.TEACHER} />,
          children: [
            { path: "", element: <HomePage /> },
            {
              path: "create-exam",
              children: [{ path: ":id", element: <CreateExam /> }],
            },
            { path: "students", element: <AllStudents /> },
            { path: "view-student-detail", element: <Student /> },
            { path: "view-exams", element: <ViewExam /> },
            {
              path: "edit-exam",
              children: [{ path: ":id", element: <EditExam /> }],
            },
            {
              path: "view-exam",
              children: [{ path: ":id", element: <EditExam /> }],
            },
            { path: "reset-password", element: <ResetPassword /> },
          ],
        },

        {
          path: "student",
          element: <ProtectedRoute role={userRole.STUDENT} />,
          children: [
            { path: "", element: <HomePage /> },
            { path: "Exams", element: <AllExams /> },
            { path: "view-result", element: <ViewResult /> },
            {
              path: "give-exam",
              children: [{ path: ":id", element: <GiveExam /> }],
            },
            { path: "profile", element: <Profile /> },
            { path: "reset-password", element: <ResetPassword /> },
          ],
        },
      ],
    },
  ]);

  return routes;
};
export default AppRoutes;
