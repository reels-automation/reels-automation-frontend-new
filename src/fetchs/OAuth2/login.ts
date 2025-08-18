import { API_URL } from "../api";

export const loginGoogle = () => {
  const endpoint = `${API_URL}/auth/google/login`;
  console.log("Redirecting to:", endpoint); // Debug log
  window.location.href = endpoint;
  // No further code will run after redirect
};