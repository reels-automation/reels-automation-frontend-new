import { useEffect, useState } from "react"
import { API_URL } from "@/fetchs/api"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/footer"
import { Play, Download, User, Globe, FileText, Mic, Video, Sparkles, ChevronDown, ChevronUp } from "lucide-react"

interface VideoData {
  tema: string
  usuario: string
  idioma: string
  personaje: string
  script: string
  audio_item: {
    tts_audio_name: string
    tts_audio_directory: string
    file_getter: string
    pitch: number
    tts_voice: string
    tts_rate: number
    pth_voice: string
  }[]
  subtitle_item: {
    subtitles_name: string
    file_getter: string
    subtitles_directory: string
  }[]
  author: string
  gameplay_name: string
  background_music: {
    audio_name: string
    file_getter: string
    start_time: number
    duration: number
  }[]
  images: {
    image_name: string
    image_modifier: string
    file_getter: string
    image_directory: string
    timestamp: number
    duration: number
  }[]
  random_images: boolean
  random_amount_images: number
  gpt_model: string
  url: string
}

function getSubFromToken(): string {
  try {
    const token = localStorage.getItem("authToken")
    if (!token) return ""
    const payload = token.split(".")[1]
    const decoded = JSON.parse(atob(payload))
    return decoded.sub
  } catch (err) {
    console.error("Error decoding token", err)
    return ""
  }
}

const MisVideos = () => {
  const [videos, setVideos] = useState<VideoData[]>([])
  const [userId, setUserId] = useState<string>("")
  const [expandedVideo, setExpandedVideo] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const id = getSubFromToken()
    if (id) {
      setUserId(id)
    }
  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchVideos = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${API_URL}/get-videos-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        })

        if (!res.ok) {
          console.error("Error al obtener los videos:", res.statusText)
          return
        }

        const data = await res.json()
        setVideos(data.videos)
        console.log("Videos: ", data.videos)
      } catch (err) {
        console.error("Error en la solicitud de videos:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [userId])

  const toggleExpanded = (index: number) => {
    setExpandedVideo(expandedVideo === index ? null : index)
  }

  const getCharacterName = (personaje: string) => {
    switch (personaje) {
      case "homero":
        return "Homero Simpson"
      case "peter_griffin":
        return "Peter Griffin"
      default:
        return personaje
    }
  }

  const getLanguageName = (idioma: string) => {
    return idioma === "es" ? "Español" : "English"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow px-4 py-8">
        <div className="w-full max-w-6xl mx-auto pt-16 pb-8">
          {/* Header Section */}
          <div className="text-center space-y-6 mb-12">
            <div className="relative mx-auto">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-xl mx-auto border-4 border-white">
                <Video className="text-purple-600 w-12 h-12 sm:w-16 sm:h-16" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100/30 to-blue-100/30"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center leading-tight">
                MIS
                <span className="text-purple-600"> VIDEOS</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Todos tus videos creados con inteligencia artificial
              </p>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-gray-600">Cargando tus videos...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && videos.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aún no tienes videos</h3>
              <p className="text-gray-600 mb-6">¡Crea tu primer video para verlo aquí!</p>
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Crear Video
              </Button>
            </div>
          )}

          {/* Videos Grid */}
          {!isLoading && videos.length > 0 && (
            <div className="space-y-6">
              {videos.map((video, index) => (
                <Card
                  key={index}
                  className="bg-white shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Video Header */}
                  <CardHeader
                    className="bg-gradient-to-r from-purple-50 to-blue-50 cursor-pointer hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
                    onClick={() => toggleExpanded(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{video.tema || "Video sin título"}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {getCharacterName(video.personaje)}
                            </span>
                            <span className="flex items-center">
                              <Globe className="w-4 h-4 mr-1" />
                              {getLanguageName(video.idioma)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        >
                          {expandedVideo === index ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Ocultar
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              Ver detalles
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Expanded Content */}
                  {expandedVideo === index && (
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Video Player */}
                        <div className="space-y-4">
                          <video
                            controls
                            className="w-full aspect-[9/16] object-contain rounded-xl border border-gray-200 shadow-md bg-black"
                          >
                            <source src={video.url} type="video/mp4" />
                            Tu navegador no soporta el video.
                          </video>

                          <Button
                            onClick={() => (window.location.href = video.url)}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                          >
                            <Download className="mr-2 h-5 w-5" />
                            Descargar Video
                          </Button>
                        </div>

                        {/* Video Details */}
                        <div className="space-y-6">
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <FileText className="mr-2 h-5 w-5 text-purple-600" />
                              Información del Video
                            </h4>

                            <div className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <User className="w-4 h-4 text-gray-500 mt-1" />
                                <div>
                                  <span className="text-sm font-medium text-gray-700">Autor:</span>
                                  <p className="text-gray-600">{video.author}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <Globe className="w-4 h-4 text-gray-500 mt-1" />
                                <div>
                                  <span className="text-sm font-medium text-gray-700">Idioma:</span>
                                  <p className="text-gray-600">{getLanguageName(video.idioma)}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <Mic className="w-4 h-4 text-gray-500 mt-1" />
                                <div>
                                  <span className="text-sm font-medium text-gray-700">Voz TTS:</span>
                                  <p className="text-gray-600">{video.audio_item[0]?.tts_voice}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <Mic className="w-4 h-4 text-gray-500 mt-1" />
                                <div>
                                  <span className="text-sm font-medium text-gray-700">Voz PTH:</span>
                                  <p className="text-gray-600">{video.audio_item[0]?.pth_voice}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Script Section */}
                          {video.script && (
                            <div className="bg-blue-50 rounded-xl p-6">
                              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                                Guión
                              </h4>
                              <div className="bg-white rounded-lg p-4 border border-blue-200">
                                <p className="text-gray-700 leading-relaxed">{video.script}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default MisVideos