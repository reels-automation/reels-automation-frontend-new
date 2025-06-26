import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ProtectedRouteProps } from "./prInterface";
import { useAuth } from "../authContext";

const NotGuestRoute: React.FC<ProtectedRouteProps> = ({ exceptRoutes = [] }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const currentRoute = location.pathname;

  if (!isLoggedIn && !exceptRoutes.includes(currentRoute)) {
    return <Navigate to="/guest" replace />;
  }

  return <Outlet />;
};

export default NotGuestRoute;