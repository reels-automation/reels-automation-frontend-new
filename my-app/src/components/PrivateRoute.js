import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { authState } = useContext(AuthContext);
  
    // Evita múltiples registros
    if (!authState.isAuthenticated) {
      console.log("AA: ", authState.isAuthenticated);
    }
  
    return authState.isAuthenticated ? (
      <Element {...rest} />
    ) : (
      <Navigate to="/login" />
    );
  };
  

export default PrivateRoute;
