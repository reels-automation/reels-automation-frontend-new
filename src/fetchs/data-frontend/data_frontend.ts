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
    return response.data;
  } catch (err) {
    console.error("Error al obtener los models:", err);
    return [];
  }
}

export const getVoiceModels = async () => {
  const endpoint = `${API_URL}/voice-models`;

  try {
    const response = await axios.get(endpoint);
    console.log("LOS VOICE MODELS ACA: ", response.data)
    return response.data;
  } catch (err) {
    console.error("Error al obtener los models:", err);
    return [];
  }
}

export async function getMicrosoftVoices(): Promise<string[]> {
  const response = await fetch(
    "https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list?trustedclienttoken=6A5AA1D4EAFF4E9FB37E23D68491D6F4"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Microsoft TTS voices");
  }

  const voices = await response.json();

  const languagePrefixes = ["es", "es-", "ca", "en", "en-"];

  // Solo devolver el ShortName (string)
  const filteredVoices = voices
    .filter((voice: any) =>
      languagePrefixes.some((prefix) => voice.Locale?.startsWith(prefix))
    )
    .map((voice: any) => voice.ShortName);

  return filteredVoices;
}


