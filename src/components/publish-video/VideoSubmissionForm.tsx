import { useState } from "react";

const characters = ["Homero Simpson", "Otro Personaje"];
const voices = ["es-ES-XimenaNeural", "es-MX-JorgeNeural"];
const pthVoices = ["HOMERO SIMPSON LATINO", "OTRA VOZ"];
const gameplays = ["", "Gameplay 1", "Gameplay 2"];

type FormData = {
  tema: string;
  personaje: string;
  script: string;
  tts_audio_name: string;
  author: string;
  pitch: number;
  tts_voice: string;
  tts_rate: string;
  pth_voice: string;
  gameplay_name: string;
};

export default function VideoSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    tema: "",
    personaje: characters[0],
    script: "",
    tts_audio_name: "",
    author: "",
    pitch: 0,
    tts_voice: voices[0],
    tts_rate: "0",
    pth_voice: pthVoices[0],
    gameplay_name: gameplays[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, pitch: Number(e.target.value) });
  };

  const handleSubmit = () => {
    console.log("Submitting:", formData);
    // Aquí harías el POST request
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
      <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Publicar Video</h2>
      <input type="text" name="tema" placeholder="Tema" value={formData.tema} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <select name="personaje" value={formData.personaje} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }}>
        {characters.map((char) => (
          <option key={char} value={char}>{char}</option>
        ))}
      </select>
      <input type="text" name="script" placeholder="Script" value={formData.script} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input type="text" name="tts_audio_name" placeholder="TTS Audio" value={formData.tts_audio_name} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input type="text" name="author" placeholder="Autor" value={formData.author} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <div style={{ marginBottom: "10px" }}>
        <label>Pitch</label>
        <input type="range" min="-10" max="10" step="1" value={formData.pitch} onChange={handleSliderChange} style={{ width: "100%" }} />
      </div>
      <select name="tts_voice" value={formData.tts_voice} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }}>
        {voices.map((voice) => (
          <option key={voice} value={voice}>{voice}</option>
        ))}
      </select>
      <select name="pth_voice" value={formData.pth_voice} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }}>
        {pthVoices.map((voice) => (
          <option key={voice} value={voice}>{voice}</option>
        ))}
      </select>
      <select name="gameplay_name" value={formData.gameplay_name} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }}>
        {gameplays.map((gameplay) => (
          <option key={gameplay} value={gameplay}>{gameplay}</option>
        ))}
      </select>
      <button onClick={handleSubmit} style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px" }}>Publicar</button>
    </div>
  );
}
