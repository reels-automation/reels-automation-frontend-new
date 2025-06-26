import { API_URL } from "../api";
//import { useAuth } from "../../context/authContext";

export const loginPost = async (route: string, username: string, password: string) => {
  // Validación básica de parámetros
  if (!username || !password) {
    throw new Error("Username y password son requeridos");
  }

  try {
    const endpoint = `${API_URL}${route}`;
    console.log("Calling endpoint:", endpoint);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data?.access_token) {
      throw new Error("Respuesta inválida: falta access_token");
    }

    localStorage.setItem("authToken", data.access_token);
    return data;

  } catch (error) {
    console.error("Error detallado:", {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
};