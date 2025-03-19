import { jwtDecode } from "jwt-decode";
export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem("token");
  };
  
  export const decodeToken = (token) => {
    return jwtDecode(token);
  };
  
  export const isTokenExpired = (token) => {
    try {
      const decoded = decodeToken(token);
      if (decoded.exp < Date.now() / 1000) {
        return true; // El token ha expirado
      }
      return false;
    } catch (error) {
      return false;
    }
  };