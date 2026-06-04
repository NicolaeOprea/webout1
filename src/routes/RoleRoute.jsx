import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ allowedRoles }) {
  const { currentUser } = useAuth();

  if (allowedRoles?.length && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
