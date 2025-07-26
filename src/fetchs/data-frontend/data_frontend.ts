import { API_URL } from "../api";
import axios from "axios";

export const getOllamaModels = async () => {
  const endpoint = `${API_URL}/ollama-models`;
  console.log(endpoint)
  try {
    const response = await axios.get(endpoint);
    console.log("x lol: ", response.data.models)
    return response.data.models;
  } catch (err) {
    console.error("Error al obtener los models:", err);
    return [];
  }
};

export const getGameplays = async () => {
  const endpoint = `${API_URL}/gameplays`;
  console.log(endpoint)
  try {
    const response = await axios.get(endpoint);
    console.log("Response: ", response)
    return response.data;
  } catch (err) {
    console.error("Error al obtener los models:", err);
    return [];
  }
}