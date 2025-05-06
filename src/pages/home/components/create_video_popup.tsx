import { Fragment, useState , useEffect} from "react";
import { createVideo } from "../../../fetchs/create-video/createVideo";
import { FormButton } from "../../../components/forms/formButton";
import { FormInput } from "../../../components/forms/formInput";
import { FormSelect } from "../../../components/forms/formSelect";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface CreateVideoPopUpProps {
  isOpen: boolean;
  closePopup: () => void;
}

const CreateVideoPopUp: React.FC<CreateVideoPopUpProps> = ({ isOpen, closePopup }) => {
  const [formData, setFormData] = useState({
    tema: "",
    usuario: "",
    idioma: "",
    personaje: "",
    script: "",
    audio_item: [
      {
        tts_audio_name: "",
        tts_audio_directory: "",
        file_getter: "",
        pitch: 0,
        tts_voice: "",
        tts_rate: 0,
        pth_voice: "HOMERO SIMPSON LATINO",
      },
    ],
    subtitle_item: [
      {
        subtitles_name: "",
        file_getter: "",
        subtitles_directory: "",
      },
    ],
    author: "",
    gameplay_name: "",
    background_music: [
      {
        audio_name: "",
        file_getter: "",
        start_time: 0,
        duration: 100,
      },
    ],
    images: [
      {
        image_name: "homero1.png",
        image_modifier: "rotate",
        file_getter: "local",
        image_directory: "HOMERO SIMPSON LATINO",
        timestamp: 0,
        duration: 10,
      },
    ],
    random_images: true,
    random_amount_images: 5,
    gpt_model: "",
  });

  function getSubFromToken(): string  {
    try {
      const token = localStorage.getItem("authToken"); // Cambia esto por tu clave real
      if (!token) return "";
  
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
  
      return decoded.sub; // Esto ahora se espera que sea string (UUID)
    } catch (err) {
      console.error("Error decoding token", err);
      return "";
    }
  }

  useEffect(() => {
    const sub = getSubFromToken();
    if (sub !== null) {
      setFormData((prev) => ({ ...prev, usuario: sub }));
    }
  }, []);

  const [isTema, setIsTema] = useState(false);
  
  const handleSwitchChange = () => {
    setIsTema(prevState => !prevState); // Alterna el estado entre 'tema' y 'script'
  };

  const characters = ["Homero Simpson"];
  const voices = ["es-ES-XimenaNeural", "es-MX-JorgeNeural"];
  const pthVoices = ["HOMERO SIMPSON LATINO"];
  const gameplays = [
    { value: "subway.mp4", label: "Subway Surfers" },
]; {/*Hacer que sea un value a subway y que despuse del backend se agarren random*/}

    const accounts = ["aprendiendo.con.personajes"];

  const idiomas = [
    { value: "es", label: "Español" },
    { value: "en", label: "English" },
  ];

  const personajes = [
    { value: "Homero Simpson", label: "Homero Simpson" },
  ];

  const gptModels = [
    { value: "llama3.2:3b", label: "Llama" },
    { value: "mistral:latest", label: "Mistral" },    
  ]

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
      console.log("Clicked outside the popup");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createVideo(formData);
      console.log("Submitting:", formData);
  
      // Reiniciar el formulario a sus valores iniciales
      setFormData({
        tema: "",
        usuario: "",
        idioma: "",
        personaje: "",
        script: "",
        audio_item: [
          {
            tts_audio_name: "",
            tts_audio_directory: "",
            file_getter: "",
            pitch: 0,
            tts_voice: "",
            tts_rate: 0,
            pth_voice: "HOMERO SIMPSON LATINO",
          },
        ],
        subtitle_item: [
          {
            subtitles_name: "",
            file_getter: "",
            subtitles_directory: "",
          },
        ],
        author: "",
        gameplay_name: "",
        background_music: [
          {
            audio_name: "",
            file_getter: "",
            start_time: 0,
            duration: 100,
          },
        ],
        images: [
          {
            image_name: "homero1.png",
            image_modifier: "rotate",
            file_getter: "local",
            image_directory: "HOMERO SIMPSON LATINO",
            timestamp: 0,
            duration: 10,
          },
        ],
        random_images: true,
        random_amount_images: 5,
        gpt_model: "",
      });
  
      // También puedes cerrar el popup automáticamente si quieres:
       closePopup();
    } catch (error) {
      console.error("Error creating video:", error);
    }
  };
  

  const changeIdioma = (value: string) => {
    let ttsVoice = "";

    if (value === "es") {
      ttsVoice = "es-ES-XimenaNeural";
    } else if (value === "en") {
      ttsVoice = "en-NZ-MitchellNeural";
    }

    setFormData((prev) => ({
      ...prev,
      idioma: value,
      audio_item: [
        {
          ...prev.audio_item[0],
          tts_voice: ttsVoice,
        },
      ],
    }));
  };

  return (
    <Fragment>
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 md:space-y-6 flex flex-col justify-center items-center"
        >
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm flex justify-center items-center pt-16"
            onClick={handleOutsideClick}
          >
            <div className="bg-white w-96 rounded-lg p-6 relative flex flex-col items-center max-h-[90vh] overflow-y-auto">
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 bg-gray-500 text-white rounded-full p-2 hover:bg-gray-600 hover:cursor-pointer"
              >
                ⨉
              </button>

              <h2 className="text-xl text-center mb-6">Configura tu video</h2>

              {/*Secciion del tema*/}
              <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Seleccion de tema</h2>

              <div className="flex items-center mb-4">
        <Label htmlFor="toggleTemaScript" className="mr-2">
          Tema / Script
        </Label>
        <Switch
          id="toggleTemaScript"
          checked={isTema}
          onCheckedChange={handleSwitchChange} // Cambia el estado cuando se hace clic en el Switch
        />
      </div>

            {isTema ? (
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4 mt-4">
          <Label htmlFor="tema">Tema</Label>
          <Input
            className="rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
            type="text"
            id="tema"
            placeholder="Tema"
            value={formData.tema}
            onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
          />
        </div>
      ) : (
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4 mt-4">
          <Label htmlFor="script">Script</Label>
          <Textarea
            className="rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
            id="script"
            placeholder="Escribe el script"
            value={formData.script}
            onChange={(e) => setFormData({ ...formData, script: e.target.value })}
          />
        </div>
      )}


              <div className="grid w-full max-w-sm items-center gap-1.5 mb-4 mt-4">
                <Label htmlFor="autor">Autor</Label>
                <Input className="rounded-lg bg-gray-50 shadow-sm focus:ring-2 focus:ring-rose-400 focus:outline-none" type="text" id="autor" placeholder="Autor" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
            </div>
            
            {/*Seccion del video*/}

            <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm p-3 mb-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Configuraciones de Video</h2>
  
  {/* Contenedor con grid dinámico */}
  <div className="grid grid-cols-2  w-full mt-2 mb-2">

    {/* Contenedor para el select de Idioma */}
    <div className="mb-2">
      <Label htmlFor="idioma">Idioma</Label>
      <Select value={formData.idioma} onValueChange={(value) => changeIdioma(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Idioma"/>
        </SelectTrigger>
        <SelectContent>
          {idiomas.map((idioma) => (
            <SelectItem key={idioma.value} value={idioma.value}>
              {idioma.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* Contenedor para el select de Personaje */}
    <div className="mb-2">
      <Label htmlFor="personaje">Personaje</Label>
      <Select value={formData.personaje} onValueChange={(value) => setFormData({ ...formData, personaje: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Personaje" />
        </SelectTrigger>
        <SelectContent>
          {personajes.map((personaje) => (
            <SelectItem key={personaje.value} value={personaje.value}>
              {personaje.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* Contenedor para el select de Gpt Model */}
    <div className="mb-2">
      <Label htmlFor="gptmodel">Gpt Model</Label>
      <Select value={formData.gpt_model} onValueChange={(value) => setFormData({ ...formData, gpt_model: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Modelo" />
        </SelectTrigger>
        <SelectContent>
          {gptModels.map((gptModel) => (
            <SelectItem key={gptModel.value} value={gptModel.value}>
              {gptModel.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
</div>

<div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm p-3 mb-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Configuraciones Adicionales</h2>
  

    {/* Contenedor para el select de Gameplay */}
    <div className="mb-2">
    <Label htmlFor="gameplay">Gameplay</Label>
    <Select value={formData.gameplay_name} onValueChange={(value) => setFormData({ ...formData, gameplay_name: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Gameplay" />
        </SelectTrigger>
        <SelectContent>
          {gameplays.map((gameplay) => (
            <SelectItem key={gameplay.value} value={gameplay.value}>
              {gameplay.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    
    {/* Contenedor para el select de Imagenes disponibles */}
    <div className="mb-2">
    <FormInput
                id="random_images_amount"
                label="Cantidad de imagenes random"
                type="number"
                value={formData.random_amount_images}
                placeholder="Ingrese la cantidad de imágenes random"
                onChange={(value) => setFormData({ ...formData, random_amount_images: parseInt(value, 10) })}
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm focus:ring-gray-400 focus:border-gray-400 shadow-sm focus:outline-none placeholder-gray-500 transition duration-300 ease-in-out mb-4"
    />
    </div>    
</div>

              <FormButton className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900 font-semibold rounded-lg px-6 py-3 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:from-gray-300 hover:to-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 w-full mt-4">
                Publish video
              </FormButton>
              
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default CreateVideoPopUp;
