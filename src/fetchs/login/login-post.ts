import { API_URL } from "../api";

// src/fetchs/login/login-post.ts

export const loginPost = async (route: string, username: string, password: string) => {
  const response = await fetch(`${API_URL}${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data; // you can return the token or other data you need from the response
};
