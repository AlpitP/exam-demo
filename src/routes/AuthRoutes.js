import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/authentication";
import { getLocalStorage } from "../utils/javascript";
import Dashboard from "../dashboard/Dashboard";

const AuthRoute = ({ role }) => {
  const currentRole = getLocalStorage("role");

  if (isLoggedIn() && role !== currentRole) {
    return <Navigate to={`/${currentRole}`} />;
  }

  return <Dashboard />;
};

export default AuthRoute;
