import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

// 🧪 Sample video con preview
const sampleVideos: VideoData[] = [
  {
    tema: "Física cuántica para bebés",
    usuario: "pepito123",
    idioma: "es",
    personaje: "Homero Simpson",
    script: "Mmmh, ¡el gato de Schrödinger tiene donuts!",
    audio_item: [
      {
        tts_audio_name: "audio1.mp3",
        tts_audio_directory: "/audios",
        file_getter: "local",
        pitch: 0,
        tts_voice: "es-MX-JorgeNeural",
        tts_rate: 0,
        pth_voice: "HOMERO SIMPSON LATINO"
      }
    ],
    subtitle_item: [
      {
        subtitles_name: "subs1.srt",
        file_getter: "local",
        subtitles_directory: "/subtitles"
      }
    ],
    author: "Mi amigo el galofa",
    gameplay_name: "subway.mp4",
    background_music: [
      {
        audio_name: "bg.mp3",
        file_getter: "local",
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
  }
];

const MisVideos = () => {
  return (
    <Fragment>
      <Navbar />
      <main className="flex-grow px-4 py-8 mt-10 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 mt-6">Mis Videos</h1>
        <ScrollArea className="h-[calc(100vh-12rem)] mt-5">
          <div className="space-y-6">
            {sampleVideos.map((video, index) => {
              const videoUrl = `http://localhost:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3ZpZGVvcy1ob21lcm8vY29tbyUyMGVzdHVkaWFyJTIwZW4lMjBsYSUyMHVuaXZlc3JkaWFkJTIwZGUlMjBidWVub3MlMjBhaXJlcyUyMHklMjBhcnBvcmFyJTIwdG9kYXMlMjBsYXMlMjBtYXRlcmlhcy5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1GS1JQNldQVFdUSUpKVVc4UFhKMCUyRjIwMjUwNTA2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUwNlQwNDU1NTdaJlgtQW16LUV4cGlyZXM9NDMxOTkmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUpHUzFKUU5sZFFWRmRVU1VwS1ZWYzRVRmhLTUNJc0ltVjRjQ0k2TVRjME5qVXpNVEkzTWl3aWNHRnlaVzUwSWpvaVFVdEpRVWxQVTBaUFJFNU9OMFZZUVUxUVRFVWlmUS50Y2Jtdlg3c3p5ZGlUMkZkbDFYdjA2UzVWUlk1UU54eGZPWWRuNEVPbXhuOEkweXp2WU9SQUQ1ZG56ZUNWR2tsUGh2cHBIRFdfWnRfNXV0SV8yU1UzZyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTJlZGNjNjg4YmZmYjhkYWIzMTEwYjM3ZTdlOWM2N2NiZjQ0YzcwN2E4ZDBlODk2MTBlY2RjZmJkZTIyNmVlMDA`; // 🔁 Adaptá esta URL

              return (
                <Card key={index} className="w-full max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle>{video.tema} — {video.personaje}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <video
  controls
  className="h-80 w-44 rounded-xl border border-gray-300 dark:border-gray-700 shadow-md object-cover mx-auto"
>
  <source src={videoUrl} type="video/mp4" />
  Your browser does not support the video tag.
</video>


                    <div><strong>Usuario:</strong> {video.usuario}</div>
                    <div><strong>Idioma:</strong> {video.idioma}</div>
                    <div><strong>Script:</strong> {video.script}</div>
                    <div><strong>Gameplay:</strong> {video.gameplay_name}</div>
                    <div><strong>Autor:</strong> {video.author}</div>
                    <div><strong>Modelo GPT:</strong> {video.gpt_model}</div>

                    <Separator />
                    <div className="flex justify-end">
                      <Button variant="default" className="w-full sm:w-auto">
                        Descargar Video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </main>
      <Footer />
    </Fragment>
  );
};

export default MisVideos;
