import { API_URL } from "../api";
//import { useAuth } from "../../context/authContext";

export const loginPost = async (route: string, username: string, password: string) => {
  
  console.log("asda ")
  console.log(`${API_URL}${route}`)

  try {
    const response = await fetch(`${API_URL}${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    console.log("Response status:", response.status);
    const contentType = response.headers.get('content-type');

    // Verifica primero el tipo de contenido
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error("Respuesta no es JSON:", text);
      throw new Error("La respuesta del servidor no es válida");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Error de autenticación");
    }

    if (!data.access_token) {
      throw new Error("No se recibió token en la respuesta");
    }

    // Verifica que el token tenga formato JWT básico
    const tokenParts = data.access_token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error("Token recibido no tiene formato JWT válido");
    }

    localStorage.setItem("authToken", data.access_token);
    return data;

  } catch (error) {
    console.error("Error en loginPost:", error);
    throw error; // Re-lanza el error para manejarlo en el componente
  }
};
