import { Fragment, useState , useEffect} from "react";
import { createVideo } from "../../../fetchs/create-video/createVideo";
import { useAuth } from "@/context/authContext";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X, Sparkles, User, Globe, Gamepad2, Image, Settings } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { API_URL } from "@/fetchs/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getOllamaModels } from "@/fetchs/data-frontend/data_frontend";

interface CreateVideoPopUpProps {
  isOpen: boolean;
  closePopup: () => void;
  closePopupMessage: () => void;
}

const CreateVideoPopUp: React.FC<CreateVideoPopUpProps> = ({ isOpen, closePopup, closePopupMessage }) => {
  
  const { isLoggedIn } = useAuth();
  const  constanteMagica  = 100;
  const [gptModels, setGptModels] = useState<string[]>([]);


  const [formData, setFormData] = useState({
    tema: "",
    usuario: "5e00feba-5118-4289-b465-878a4bb2ed58",
    idioma: "es",
    personaje: "homero",
    script: "",
    audio_item: [
      {
        tts_audio_name: "",
        tts_audio_directory: "",
        file_getter: "",
        pitch: 0,
        tts_voice: "es-ES-XimenaNeural",
        tts_rate: 0,
        pth_voice: "homero",
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
    gpt_model: gptModels[0],
  });

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await getOllamaModels()
        setGptModels(data)
        if (data.length > 0 && !formData.gpt_model){
          setFormData((prev)=> ({ ...prev, gpt_model:data[0]}))
        }
      } catch (error) {
        console.error("Error al cargar los modelos:", error)
      } 
    }

    fetchModels()
  }, [])


  function getSubFromToken(): string  {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return "";
  
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));

      console.log("decoded sub:", decoded.sub)  
      return decoded.sub;
    } catch (err) {
      console.error("Error decoding token", err);
      return "";
    }
  }

  const [userTokens, setUserTokens] = useState<number | null>(null);

  async function getTokensFromUser() {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/user-tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: getSubFromToken() }),
      });
  
      const data = await response.json();
      setUserTokens(data.credits || 0);
    } catch (err) {
      console.error("Error fetching tokens", err);
      setUserTokens(0);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if (isOpen) {
      const sub = getSubFromToken();
      if (sub) {
        setFormData((prev) => ({ ...prev, usuario: sub }));
        getTokensFromUser();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const [isTema, setIsTema] = useState(false);
  
  const handleSwitchChange = () => {
    setIsTema(prevState => !prevState);
  };

  const gameplays = [
    { value: "subway.mp4", label: "Subway Surfers" },
    { value: "60seconds1.mp4", label: "60 Seconds" },
    { value: "clash-vertical1.mp4", label: "Clash Royale" },
    { value: "dbd.mp4", label: "Dead by Daylight" },
    { value: "flappy-ai.mp4", label: "Flappy Bird" },
    { value: "gettingoverit.mp4", label: "Getting Over it" },
    { value: "gta.mp4", label: "Gta" },
    { value: "undertale1.mp4", label: "Undertale" }
  ];

  const idiomas = [
    { value: "es", label: "Español" },
    { value: "en", label: "English" },
  ];

  const personajes = [
    { value: "homero", label: "Homero Simpson" },
    { value: "peter_griffin", label: "Peter Griffin" },
  ];

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createVideo(formData);
      console.log("Submitting:", formData);
      // Reiniciar el formulario a sus valores iniciales
      setFormData({
        tema: "",
        usuario: "5e00feba-5118-4289-b465-878a4bb2ed58",
        idioma: "es",
        personaje: "homero",
        script: "",
        audio_item: [
          {
            tts_audio_name: "",
            tts_audio_directory: "",
            file_getter: "",
            pitch: 0,
            tts_voice: "es-ES-XimenaNeural",
            tts_rate: 0,
            pth_voice: "homero",
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
      closePopupMessage();
    } catch (error) {
      console.error("Error creating video:", error);
    } finally {
      setIsLoading(false);
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
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={handleOutsideClick}
        >
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[95vh] flex flex-col overflow-hidden">
            <div className="bg-white rounded-xl p-6 h-full overflow-y-auto flex-1">
              {isLoading && (
                <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Sparkles className="mr-2 h-6 w-6 text-purple-600" />
                  Cargando tokens...
                </h2>
                <Button
                  onClick={closePopup}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              )}
              {!isLoading && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Sparkles className="mr-2 h-6 w-6 text-purple-600" />
                    Configura tu Video
                  </h2>
                  <Button
                    onClick={closePopup}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-100 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Mode Selection */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-purple-600" />
                    ¿Qué querés hacer?
                  </h3>

                  <div className="flex items-center space-x-4 mb-6">
                    <Label htmlFor="toggleTemaScript" className="text-sm font-medium text-gray-700">
                      Modo:
                    </Label>
                    <Switch
                      id="toggleTemaScript"
                      checked={isTema}
                      onCheckedChange={handleSwitchChange}
                      className="data-[state=checked]:bg-purple-600 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 font-medium">
                      {isTema ? 'Crear texto desde tema' : 'Leer un guión en voz alta'}
                    </span>
                  </div>

                  {isTema ? (
                    <div className="space-y-2">
                      <Label htmlFor="tema" className="text-sm font-medium text-gray-700">
                        Escribí un tema
                      </Label>
                      <p className="text-sm text-gray-500 mb-2">
                        El bot generará automáticamente un texto basado en este tema.
                      </p>
                      <Input
                        id="tema"
                        type="text"
                        placeholder="Ej: El futuro de la inteligencia artificial"
                        value={formData.tema}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= constanteMagica) {
                            setFormData({ ...formData, tema: value });
                          }
                        }}
                        className={`h-12 border ${
                          formData.tema.length < constanteMagica ? 'border-gray-300' : 'border-red-500'
                        } focus:border-purple-500 focus:ring-purple-500`}
                      />
                      <p
                        className={`text-sm ${
                          formData.tema.length < constanteMagica ? 'text-green-600' : 'text-red-500'
                        }`}
                      >
                        {formData.tema.length < constanteMagica
                          ? `${constanteMagica - formData.tema.length} caracteres restantes`
                          : '¡Límite de constanteMagica caracteres alcanzado!'}
                      </p>
                    </div>


                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="script" className="text-sm font-medium text-gray-700">
                        Escribí tu guión
                      </Label>
                      <p className="text-sm text-gray-500 mb-2">
                        El bot leerá este texto en voz alta exactamente como lo escribas.
                      </p>
                      <Textarea
                        id="script"
                        placeholder="Hola, bienvenidos a este nuevo video..."
                        value={formData.script}
                        onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                        className="min-h-24 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  )}
                </div>

                {/* Video Configuration */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5 text-purple-600" />
                    Configuraciones de Video
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="idioma" className="text-sm font-medium text-gray-700 flex items-center">
                        <Globe className="mr-1 h-4 w-4" />
                        Idioma
                      </Label>
                      <Select value={formData.idioma} onValueChange={(value) => changeIdioma(value)}>
                        <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 cursor-pointer">
                          <SelectValue placeholder="Selecciona idioma"/>
                        </SelectTrigger>
                        <SelectContent>
                          {idiomas.map((idioma) => (
                            <SelectItem key={idioma.value} value={idioma.value} className="cursor-pointer">
                              {idioma.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="personaje" className="text-sm font-medium text-gray-700 flex items-center">
                        <User className="mr-1 h-4 w-4" />
                        Personaje
                      </Label>
                      <Select
                        value={formData.personaje}
                        onValueChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            personaje: value,
                            audio_item: [
                              {
                                ...prev.audio_item[0],
                                pth_voice: value,
                              },
                            ],
                          }));
                        }}
                      >
                        <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 cursor-pointer">
                          <SelectValue placeholder="Selecciona personaje" />
                        </SelectTrigger>
                        <SelectContent>
                          {personajes.map((personaje) => (
                            <SelectItem key={personaje.value} value={personaje.value} className="cursor-pointer">
                              {personaje.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gptmodel" className="text-sm font-medium text-gray-700">
                        Modelo GPT
                      </Label>
                      <Select value={formData.gpt_model} onValueChange={(value) => setFormData({ ...formData, gpt_model: value })}>
                        <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 cursor-pointer">
                          <SelectValue placeholder="Selecciona modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          {gptModels.map((gptModel) => (
                            <SelectItem key={gptModel} value={gptModel} className="cursor-pointer">
                              {gptModel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Configuration */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Gamepad2 className="mr-2 h-5 w-5 text-purple-600" />
                    Configuraciones Adicionales
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gameplay" className="text-sm font-medium text-gray-700">
                        Gameplay
                      </Label>
                      <Select value={formData.gameplay_name} onValueChange={(value) => setFormData({ ...formData, gameplay_name: value })}>
                        <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 cursor-pointer">
                          <SelectValue placeholder="Selecciona gameplay" />
                        </SelectTrigger>
                        <SelectContent>
                          {gameplays.map((gameplay) => (
                            <SelectItem key={gameplay.value} value={gameplay.value} className="cursor-pointer">
                              {gameplay.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="random_images_amount" className="text-sm font-medium text-gray-700 flex items-center">
                        <Image className="mr-1 h-4 w-4" />
                        Cantidad de imágenes
                      </Label>
                      <Input
                        id="random_images_amount"
                        type="number"
                        value={formData.random_amount_images}
                        min={1}
                        max={10}
                        placeholder="Cantidad de imágenes"
                        onChange={(e) => setFormData({ ...formData, random_amount_images: parseInt(e.target.value, 10) })}
                        className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Credits Display */}
                {userTokens !== null && (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <div className="text-center">
                      <span className="text-sm text-gray-600">Tokens disponibles: </span>
                      <span className="text-lg font-semibold text-emerald-700">{userTokens}</span>
                    </div>
                  </div>
                )}

                {/* Error Messages */}
                {userTokens === 0 && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertTitle className="text-red-800">¡Sin créditos!</AlertTitle>
                    <AlertDescription className="text-red-700">
                      No tenés tokens disponibles para publicar un video.
                    </AlertDescription>
                  </Alert>
                )}

                {!isLoggedIn && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertTitle className="text-red-800">¡Inicio de sesión requerido!</AlertTitle>
                    <AlertDescription className="text-red-700">
                      Necesitas iniciar sesión para hacer un video.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                {isLoggedIn && typeof userTokens === 'number' && userTokens > 0 && !isLoading && (
                  <Button
                    type="submit"
                    className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Crear Video
                  </Button>
                )}
                {isLoggedIn && typeof userTokens === 'number' && userTokens > 0 && isLoading && (
                  <button
                    type="button"
                    disabled
                    className="w-full h-14 flex items-center justify-center bg-gray-300 text-gray-700 font-semibold text-lg rounded-xl shadow-lg cursor-not-allowed opacity-70"
                  >
                    <svg className="animate-spin h-5 w-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Cargando...
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CreateVideoPopUp;
