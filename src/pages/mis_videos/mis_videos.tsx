import { useEffect, useState } from "react";
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
  url: string; // Campo adicional que viene desde el backend
}

function getSubFromToken(): string {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return "";

    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    return decoded.sub; // UUID
  } catch (err) {
    console.error("Error decoding token", err);
    return "";
  }
}

const MisVideos = () => {
  const bgColor = "#f3f4f6";
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const id = getSubFromToken();
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchVideos = async () => {
      try {
        const res = await fetch("http://127.0.0.1:7080/get-videos-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user_id: userId })
        });

        if (!res.ok) {
          console.error("Error al obtener los videos:", res.statusText);
          return;
        }

        const data = await res.json();
        setVideos(data.videos);
        console.log("Videos: ", data.videos)
        console.log("Videosadasdasdas: ", data)
      } catch (err) {
        console.error("Error en la solicitud de videos:", err);
      }
    };

    fetchVideos();
  }, [userId]);

  return (
    <div style={{ backgroundColor: bgColor }} className="min-h-screen py-8 px-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Mis Videos</h1>

      <Accordion type="multiple" className="space-y-4">
        {videos.map((video, index) => (
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
                    <source src={video.url} type="video/mp4" />
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
                  <Button
  variant="secondary"
  onClick={() => window.location.href = video.url}
  className="bg-green-300 hover:bg-green-400 text-gray-800"
>
  Descargar video
</Button>


                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  );
};

export default MisVideos;
