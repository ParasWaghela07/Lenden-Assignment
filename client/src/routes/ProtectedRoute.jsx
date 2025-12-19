import { Navigate } from "react-router-dom";
import { getAuthToken, clearAuthToken } from "../utils/authToken";

const ProtectedRoute = ({ children }) => {
  const token = getAuthToken();

  if (!token) {
    clearAuthToken();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
