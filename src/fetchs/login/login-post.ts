import { API_URL } from "../api";
import { useAuth } from "../../context/authContext";

export const loginPost = async (route: string, username: string, password: string) => {
  const response = await fetch(`${API_URL}${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, password }),
  });

  console.log(response)

  if (!response.ok) {
    throw new Error("Login failed");
  }
  const data = await response.json();
  localStorage.setItem("authToken", data["access_token"]);
  return data;
};
