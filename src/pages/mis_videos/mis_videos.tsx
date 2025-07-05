import { useEffect, useState } from "react"
import { API_URL } from "@/fetchs/api"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/footer"
import {
  Play,
  Download,
  User,
  Globe,
  FileText,
  Mic,
  Video,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"

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
  createdAt?: string
  id?: string
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

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

const MisVideos = () => {
  const [videos, setVideos] = useState<VideoData[]>([])
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [userId, setUserId] = useState<string>("")

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (typeof window === "undefined") return
    if (isSidebarOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isSidebarOpen])

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
          setVideos([])
          return
        }
        const data = await res.json()
        console.log("VIDEOS DATA:", data.videos)
        setVideos(data.videos)
        setSelectedVideoId(data.videos[0]?.id ?? "0")
      } catch (err) {
        console.error("Error en la solicitud de videos:", err)
        setVideos([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideos()
  }, [userId])

  const selectedVideo = videos.find((video, idx) => (video.id ?? String(idx)) === selectedVideoId)

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      {/* Mobile open sidebar button */}
      <div className="md:hidden flex items-center px-4 pt-16 pb-2 bg-gray-50 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
          className="mr-2"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">Mis Videos</h2>
      </div>
      <div className="flex flex-row w-full max-w-full overflow-x-hidden">
        {/* Sidebar Overlay for mobile */}
        {isSidebarOpen && (
          <>
            <div
              className="fixed left-0 right-0 top-16 bottom-0 bg-black/40 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <aside className="fixed left-0 right-0 top-16 h-[calc(100vh-64px)] w-64 max-w-full overflow-y-auto overflow-x-hidden z-30 bg-white shadow-xl md:hidden transition-transform duration-300">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Video className="w-6 h-6 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Mis Videos</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  className="hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {isLoading ? (
                  <div className="p-4">
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-16 bg-gray-200 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : videos.length === 0 ? (
                  <div className="p-4 text-center">
                    <div className="text-gray-500">
                      <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No hay videos</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-2">
                    {videos.map((video, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedVideoId(String(idx))
                        }}
                        className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 hover:bg-gray-50 ${
                          selectedVideoId === (String(idx)) ? "bg-purple-50 border-l-4 border-purple-600" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                              {getLanguageName(video.idioma)}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900 text-sm leading-tight">
                            {truncateText(video.tema, 50)}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{getCharacterName(video.personaje)}</span>
                            <span>{video.createdAt || ""}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </>
        )}
        {/* Sidebar desktop: colapsable y sticky, nunca desplazado por el main */}
        <aside className={`hidden md:flex flex-col flex-shrink-0 overflow-y-auto overflow-x-hidden bg-white border-r border-gray-200 sticky top-16 h-screen transition-all duration-300 ease-in-out z-auto ${isSidebarCollapsed ? 'w-20' : 'w-80'}`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="w-6 h-6 text-purple-600" />
              {!isSidebarCollapsed && <h2 className="text-lg font-semibold text-gray-900 md:block">Mis Videos</h2>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              className="hover:bg-gray-100 md:block hidden"
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {isLoading ? (
              <div className="p-4">
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : videos.length === 0 ? (
              <div className="p-4 text-center">
                <div className="text-gray-500">
                  <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  {!isSidebarCollapsed && <p className="text-sm">No hay videos</p>}
                </div>
              </div>
            ) : (
              <div className="p-2">
                {videos.map((video, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVideoId(String(idx))}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 hover:bg-gray-50 ${
                      selectedVideoId === (String(idx)) ? "bg-purple-50 border-l-4 border-purple-600" : "hover:bg-gray-50"
                    }`}
                  >
                    {isSidebarCollapsed ? (
                      <div className="flex justify-center">
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {getLanguageName(video.idioma)}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm leading-tight">
                          {truncateText(video.tema, 50)}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{getCharacterName(video.personaje)}</span>
                          <span>{video.createdAt || ""}</span>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>
        {/* Main Content */}
        <div className="flex-1 min-h-screen w-0 overflow-x-hidden pt-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-gray-600">Cargando videos...</p>
            </div>
          ) : !selectedVideo ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Video className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Selecciona un video</h3>
              <p className="text-gray-600">Elige un video de la lista para ver sus detalles</p>
            </div>
          ) : (
            <div className="p-4 sm:p-8">
              {/* Video Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedVideo.tema}</h1>
                    <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {getCharacterName(selectedVideo.personaje)}
                      </span>
                      <span className="flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        {getLanguageName(selectedVideo.idioma)}
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {selectedVideo.createdAt || ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Video Player */}
                <div className="space-y-6">
                  <Card className="overflow-hidden shadow-lg">
                    <div className="w-full aspect-[9/16] bg-black flex items-center justify-center">
                      {selectedVideo.url ? (
                        <video
                          controls
                          className="w-full h-full object-contain rounded-xl border border-gray-200 shadow-md bg-black"
                        >
                          <source src={selectedVideo.url} type="video/mp4" />
                          Tu navegador no soporta el video.
                        </video>
                      ) : (
                        <div className="text-center text-white">
                          <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-sm opacity-75">Video Preview</p>
                          <p className="text-xs opacity-50 mt-2">Click para reproducir</p>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    onClick={() => {
                      if (selectedVideo.url) {
                        window.open(selectedVideo.url, "_blank")
                      }
                    }}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Descargar Video
                  </Button>
                </div>
                
                {/* Video Details */}
                <div className="space-y-6">
                  {/* Technical Info */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-purple-600" />
                        Información Técnica
                      </h3>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <User className="w-4 h-4 text-gray-500 mt-1" />
                            <div>
                              <span className="text-sm font-medium text-gray-700">Autor:</span>
                              <p className="text-gray-600">{selectedVideo.author}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <Globe className="w-4 h-4 text-gray-500 mt-1" />
                            <div>
                              <span className="text-sm font-medium text-gray-700">Idioma:</span>
                              <p className="text-gray-600">{getLanguageName(selectedVideo.idioma)}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <Sparkles className="w-4 h-4 text-gray-500 mt-1" />
                            <div>
                              <span className="text-sm font-medium text-gray-700">Modelo GPT:</span>
                              <p className="text-gray-600">{selectedVideo.gpt_model}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <Mic className="w-4 h-4 text-gray-500 mt-1" />
                            <div>
                              <span className="text-sm font-medium text-gray-700">Voz TTS:</span>
                              <p className="text-gray-600">{selectedVideo.audio_item[0]?.tts_voice}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <Mic className="w-4 h-4 text-gray-500 mt-1" />
                            <div>
                              <span className="text-sm font-medium text-gray-700">Voz PTH:</span>
                              <p className="text-gray-600">{selectedVideo.audio_item[0]?.pth_voice}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <Video className="w-4 h-4 text-gray-500 mt-1" />
                            <div>
                              <span className="text-sm font-medium text-gray-700">Gameplay:</span>
                              <p className="text-gray-600">{selectedVideo.gameplay_name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Script Section */}
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-blue-600" />
                        Guión del Video
                      </h3>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-white rounded-lg p-4 border border-blue-200 max-h-64 overflow-y-auto">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedVideo.script}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MisVideos