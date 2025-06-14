import { Navigate, useLocation } from "react-router-dom";
import { ProtectedRouteProps } from "./prInterface";
import { useAuth } from "../authContext";

const NotGuestRoute: React.FC<ProtectedRouteProps> = ({ exceptRoutes = [], children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const currentRoute = location.pathname;

  if (!isLoggedIn && !exceptRoutes.includes(currentRoute)) {
    return <Navigate to="/guest" replace />;
  }

  return <>{children}</>;
};

export default NotGuestRoute;