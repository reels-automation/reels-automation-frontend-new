import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Video, Sparkles } from "lucide-react"

const Guest = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex sm:flex-row flex-col">
          <div className="rounded-md flex sm:justify-center sm:items-center p-4 m-4 sm:w-1/2">
            <div className="w-16 h-16 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <Video className="text-white w-8 h-8 sm:w-32 sm:h-32" />
            </div>
          </div>

          <div className="flex p-4 m-4 rounded-md ml-4 sm:w-1/2">
            <div className="flex flex-col justify-start">
              <h1 className="font-bold lg:text-6xl md:text-4xl sm:text-2xl text-5xl text-gray-900">
                Crea videos ahora
              </h1>
              <p className="font-bold mt-5 lg:text-3xl md:text-xl sm:text-lg text-xl text-gray-700">Unite hoy.</p>

              {/* Características */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-600">Personalización</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Play className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-600">Exportación en HD</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Video className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-600">Personajes famosos incluidos</span>
                </div>
              </div>

              <Button
                asChild
                variant={"default"}
                className="mt-8 rounded-full h-12 text-base font-medium bg-purple-600 hover:bg-purple-700"
              >
                <Link to="/register">Crear una cuenta</Link>
              </Button>

              <div className="flex items-center my-5">
                <div className="flex-1 h-px bg-gray-400" />
                <p className="mx-4 text-gray-500 text-sm">o</p>
                <div className="flex-1 h-px bg-gray-400" />
              </div>

              <p className="font-bold text-lg text-gray-900">¿Ya tenés una cuenta?</p>
              <Button asChild variant={"outline"} className="mt-1 rounded-full h-12 text-base font-medium border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


export default Guest;