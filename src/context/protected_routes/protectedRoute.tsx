import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { ProtectedRouteProps } from "./prInterface";

// boiler
const NotGuestRoute : React.FC<ProtectedRouteProps> = ({ exceptRoutes = [] }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const currentRoute = window.location.pathname;

  useEffect(() => {
    if (!isLoggedIn && !exceptRoutes.includes(currentRoute)) {
      navigate("/guest");
    }
  }, [isLoggedIn, currentRoute, exceptRoutes, navigate]);

  /*
  if (isLoggedIn || exceptRoutes.includes(currentRoute)) {
    return <>{children}</>;
  }
  */

  return null;
};

export default NotGuestRoute;