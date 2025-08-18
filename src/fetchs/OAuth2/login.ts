import { API_URL } from "../api";

export const loginGoogle = (route: string) => {
  const endpoint = `${API_URL}${route}`;
  console.log("Redirecting to:", endpoint); // Debug log
  window.location.href = endpoint;
  // No further code will run after redirect
};