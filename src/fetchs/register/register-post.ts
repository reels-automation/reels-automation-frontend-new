import getApiUrl from "../api";

export const registerPost = async (route: string, username: string, email: string, password: string) => {
    const API_URL = await getApiUrl();
    const response = await fetch(`${API_URL}${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const json_error = await response.json();
        throw new Error(`${JSON.stringify(json_error["detail"])}`);
    }

    const data = await response.json();
    localStorage.setItem("authToken", data["access_token"])
    return data;
};
