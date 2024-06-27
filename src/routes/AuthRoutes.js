import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/authentication";
import { getStateFromLocalStorage } from "../utils/javascript";
import Dashboard from "../dashboard/Dashboard";

const AuthRoute = () => {
  const currentRole = getStateFromLocalStorage("role");

  if (isLoggedIn()) {
    return <Navigate to={`/${currentRole}`} />;
  }

  return <Dashboard />;
};

export default AuthRoute;
