import { createContext, useContext, useState, useEffect } from "react";

// Definir el tipo de contexto
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Crear el contexto con valores por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

// Hook para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
