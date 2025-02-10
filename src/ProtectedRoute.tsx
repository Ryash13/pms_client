import { Navigate } from "react-router-dom";
import { useAuthState } from "./context/AuthState";

const ProtectedRoute = ({ element }: any) => {
  const loggedInUser = useAuthState();
  const isAuthenticated = loggedInUser?.id ? true : false;
  const authToken = localStorage.getItem("auth_token");

  if (!isAuthenticated || authToken == null || authToken == undefined) {
    return <Navigate to={"/login"} />;
  }

  return element;
};

export default ProtectedRoute;
