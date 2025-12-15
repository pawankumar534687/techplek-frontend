import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoleFromToken } from "./getRoleFromToken";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = useSelector((state) => state.auth.token);
  const role = getRoleFromToken(token);

  if (!token) return <Navigate to="/login"/>;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
