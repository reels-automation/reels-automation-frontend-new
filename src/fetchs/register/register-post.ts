import { API_URL } from "../api";

export const registerPost = async (route: string, username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    const data = await response.json();
    return data;
};
