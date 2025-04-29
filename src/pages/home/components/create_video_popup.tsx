import { Fragment, useState } from "react";
import { createVideo } from "../../../fetchs/create-video/createVideo";
import { FormButton } from "../../../components/forms/formButton";
import { FormInput } from "../../../components/forms/formInput";
import { FormSelect } from "../../../components/forms/formSelect";

interface CreateVideoPopUpProps {
  isOpen: boolean;
  closePopup: () => void;
}

const CreateVideoPopUp: React.FC<CreateVideoPopUpProps> = ({ isOpen, closePopup }) => {
  const [formData, setFormData] = useState({
    tema: "",
    usuario: 0,
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
    gameplay_name: "subway.mp4",
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
    gpt_model: "mistral:latest",
  });

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
    { value: "Homero simpson latino", label: "Homero Simpson" },
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
            className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center"
            onClick={handleOutsideClick}
          >
            <div className="bg-white w-96 rounded-lg p-6 relative flex flex-col items-center">
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 bg-gray-500 text-white rounded-full p-2 hover:bg-gray-600 hover:cursor-pointer"
              >
                ⨉
              </button>

              <h2 className="text-xl text-center mb-6">Configura tu video</h2>

              <FormInput
                id="tema"
                label="Tema"
                type="text"
                value={formData.tema}
                placeholder="Ingrese el tema, ¡Doh!"
                onChange={(value) => setFormData({ ...formData, tema: value })}
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm focus:ring-gray-400 focus:border-gray-400 shadow-sm focus:outline-none placeholder-gray-500 transition duration-300 ease-in-out mb-4"
              />

              <FormInput
                id="autor"
                label="Autor"
                type="text"
                value={formData.author}
                placeholder="Ingrese el autor del video, ¡Doh!"
                onChange={(value) => setFormData({ ...formData, author: value })}
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm focus:ring-gray-400 focus:border-gray-400 shadow-sm focus:outline-none placeholder-gray-500 transition duration-300 ease-in-out mb-4"
              />

              <FormSelect
                id="idioma"
                label="Idioma"
                value={formData.idioma}
                onChange={changeIdioma}
                options={idiomas}
              />

              <FormSelect
                id="personaje"
                label="Personaje"
                value={formData.personaje}
                onChange={(value) => setFormData({ ...formData, personaje: value })}
                options={personajes}
              />

            <FormSelect
                id="gameplay"
                label="Gameplay"
                value={formData.gameplay_name}
                onChange={(value) => setFormData({ ...formData, gameplay_name: value })}
                options={gameplays}
              />

            <FormSelect
                id="gptmodel"
                label="Gpt Model"
                value={formData.gpt_model}
                onChange={(value) => setFormData({ ...formData, gpt_model: value })}
                options={gptModels}
              />

              <FormInput
                id="random_images_amount"
                label="Cantidad de Imágenes Random"
                type="number"
                value={formData.random_amount_images}
                placeholder="Ingrese la cantidad de imágenes random"
                onChange={(value) => setFormData({ ...formData, random_amount_images: parseInt(value, 10) })}
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm focus:ring-gray-400 focus:border-gray-400 shadow-sm focus:outline-none placeholder-gray-500 transition duration-300 ease-in-out mb-4"
              />

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
