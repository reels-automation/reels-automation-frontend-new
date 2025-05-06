import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

interface VideoData {
  tema: string;
  usuario: string;
  idioma: string;
  personaje: string;
  script: string;
  audio_item: {
    tts_audio_name: string;
    tts_audio_directory: string;
    file_getter: string;
    pitch: number;
    tts_voice: string;
    tts_rate: number;
    pth_voice: string;
  }[];
  subtitle_item: {
    subtitles_name: string;
    file_getter: string;
    subtitles_directory: string;
  }[];
  author: string;
  gameplay_name: string;
  background_music: {
    audio_name: string;
    file_getter: string;
    start_time: number;
    duration: number;
  }[];
  images: {
    image_name: string;
    image_modifier: string;
    file_getter: string;
    image_directory: string;
    timestamp: number;
    duration: number;
  }[];
  random_images: boolean;
  random_amount_images: number;
  gpt_model: string;
}

const sampleVideos: VideoData[] = [
  {
    tema: "Los Donuts y la Teoría Cuántica",
    usuario: "usuario1",
    idioma: "es",
    personaje: "Homero Simpson",
    script: "Mmmh... ¡Donuts cuánticos!",
    audio_item: [
      {
        tts_audio_name: "donut1.mp3",
        tts_audio_directory: "audios/",
        file_getter: "minio",
        pitch: 0,
        tts_voice: "es-MX-CarlosNeural",
        tts_rate: 0,
        pth_voice: "HOMERO SIMPSON LATINO"
      }
    ],
    subtitle_item: [
      {
        subtitles_name: "donut1.vtt",
        file_getter: "minio",
        subtitles_directory: "subtitles/"
      }
    ],
    author: "Galofa",
    gameplay_name: "subway.mp4",
    background_music: [
      {
        audio_name: "bgm1.mp3",
        file_getter: "minio",
        start_time: 0,
        duration: 100
      }
    ],
    images: [
      {
        image_name: "homero1.png",
        image_modifier: "rotate",
        file_getter: "local",
        image_directory: "HOMERO SIMPSON LATINO",
        timestamp: 0,
        duration: 10
      }
    ],
    random_images: true,
    random_amount_images: 5,
    gpt_model: "mistral:latest"
  },
];

const MisVideos = () => {
  const bgColor = "#f3f4f6";

  return (
    <div style={{ backgroundColor: bgColor }} className="min-h-screen py-8 px-4">
        <Navbar></Navbar>
      <h1 className="text-3xl font-bold mb-6">Mis Videos</h1>

      <Accordion type="multiple" className="space-y-4">
        {sampleVideos.map((video, index) => {
          const videoUrl = `https://minio.example.com/videos/${video.gameplay_name}`;
          return (
            <AccordionItem key={index} value={`video-${index}`}>
              <AccordionTrigger className="px-0">
  <div
    className="w-full max-w-2xl mx-auto bg-muted hover:bg-muted/80 transition-colors duration-200 
               rounded-xl px-6 py-4 shadow-md text-left text-lg font-medium"
  >
    🎬 {video.tema} — {video.personaje}
  </div>
</AccordionTrigger>

              <AccordionContent>
                <Card className="bg-white dark:bg-gray-900 shadow-sm p-4">
                  <CardContent className="space-y-4">
                    <video
                      controls
                      className="h-80 w-44 rounded-xl border border-gray-300 dark:border-gray-700 shadow-md object-cover mx-auto"
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Tu navegador no soporta el video.
                    </video>

                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <p><strong>Autor:</strong> {video.author}</p>
                      <p><strong>Usuario:</strong> {video.usuario}</p>
                      <p><strong>Idioma:</strong> {video.idioma}</p>
                      <p><strong>Script:</strong> {video.script}</p>
                      <p><strong>Voz TTS:</strong> {video.audio_item[0]?.tts_voice}</p>
                      <p><strong>Voz PTH:</strong> {video.audio_item[0]?.pth_voice}</p>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="secondary">
                        Descargar video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default MisVideos;
