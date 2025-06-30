import { createContext, useContext, useState, useEffect } from "react";

// Definir el tipo de usuario
interface User {
  name?: string;
  [key: string]: any;
}

// Definir el tipo de contexto
interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

// Crear el contexto con valores por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeUserFromToken(token: string): User | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    // El backend pone el nombre en 'username', lo exponemos como 'name' para el frontend
    return { name: decoded.username };
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
    setUser(decodeUserFromToken(token));
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    if (token) {
      setUser(decodeUserFromToken(token));
    } else {
      setUser(null);
    }
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>{children}</AuthContext.Provider>;
};

// Hook para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
