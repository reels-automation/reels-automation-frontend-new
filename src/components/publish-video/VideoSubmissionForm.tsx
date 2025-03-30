import { useState } from "react";
import { InputVideo } from "./components/InputVideo";
import { SelectVideo } from "./components/SelectVideo";
import { SliderVideo } from "./components/SliderVideo";
import { TextBoxVideo } from "./components/TextBoxVideo";
import { createVideo } from "../../fetchs/create-video/createVideo";

const characters = ["Homero Simpson"];
const voices = ["es-ES-XimenaNeural", "es-MX-JorgeNeural"];
const pthVoices = ["HOMERO SIMPSON LATINO"];
const gameplays = ["subway2.mp4", "subway3.mp4"];
const accounts = ["aprendiendo.con.personajes"]
export default function VideoSubmissionForm() {
  const [formData, setFormData] = useState({
    tema: "",
    personaje: characters[0],
    script: "",
    tts_audio_name: "",
    tts_audio_bucket: "",
    subtitles_name: "",
    subtitles_bucket: "",
    author: "",
    pitch: 0,
    tts_voice: voices[0],
    tts_rate: 0,
    pth_voice: pthVoices[0],
    gameplay_name: gameplays[0],
    instagram_account: "aprendiendo.con.personajes"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePitchSliderChange = (value: number) => {
    setFormData({ ...formData, pitch: value });
  };

  const handleTtsRateSliderChange = (value: number) => {
    setFormData({ ...formData, tts_rate: value });
  };

  const handleSubmit = () => {
    createVideo(formData)
    console.log("Submitting:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-100">Publicar Video</h2>
        <InputVideo
          value={formData.tema}
          onChange={(value) => setFormData({ ...formData, tema: value })}
          placeholder="Tema"
          name="tema"
        />
        <SelectVideo
          value={formData.personaje}
          onChange={(value) => setFormData({ ...formData, personaje: value })}
          options={characters}
          name="personaje"
        />
        <TextBoxVideo
          value={formData.script}
          onChange={(value) => setFormData({ ...formData, script: value })}
          placeholder="Escribe el script aquí..."
          name="script"
        />
        <InputVideo
          value={formData.tts_audio_name}
          onChange={(value) => setFormData({ ...formData, tts_audio_name: value })}
          placeholder="TTS Audio"
          name="tts_audio_name"
        />
        <InputVideo
          value={formData.author}
          onChange={(value) => setFormData({ ...formData, author: value })}
          placeholder="Autor"
          name="author"
        />
        <SliderVideo
          value={formData.pitch}
          onChange={handlePitchSliderChange}
          min={-10}
          max={10}
          step={1}
          label="Pitch"
        />
        <SliderVideo
          value={formData.tts_rate}
          onChange={handleTtsRateSliderChange}
          min={-10}
          max={10}
          step={1}
          label="TTS RATE"
        />
        <SelectVideo
          value={formData.tts_voice}
          onChange={(value) => setFormData({ ...formData, tts_voice: value })}
          options={voices}
          name="tts_voice"
        />
        <SelectVideo
          value={formData.pth_voice}
          onChange={(value) => setFormData({ ...formData, pth_voice: value })}
          options={pthVoices}
          name="pth_voice"
        />
        <SelectVideo
          value={formData.gameplay_name}
          onChange={(value) => setFormData({ ...formData, gameplay_name: value })}
          options={gameplays}
          name="gameplay_name"
        />
        <SelectVideo
          value={formData.instagram_account}
          onChange={(value) => setFormData({ ...formData, instagram_account: value })}
          options={accounts}
          name="instagram_account"
        />
        <button className="w-full p-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>Crear Reel</button>
      </div>
    </div>
  );
}
