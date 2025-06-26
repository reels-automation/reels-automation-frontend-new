import getApiUrl from "../api";
type Dictionary = Record<string, any>;

export const createVideo = async (videoData:Dictionary) => {
  const token = localStorage.getItem("authToken");
  const API_URL = await getApiUrl();
  const response = await fetch(`${API_URL}${"/create-video"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(videoData),
  });

  const data = await response.json();
  console.log("DATAA:" , data)
  return data;
};
