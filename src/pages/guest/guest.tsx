import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Guest = () => {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex sm:flex-row flex-col">
            {/* Lado Izquierdo - Logo/Placeholder */}
            <div className="rounded-md flex sm:justify-center sm:items-center p-4 m-4 sm:w-1/2">
              <div className="w-16 h-16 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                {/* Placeholder del Logo */}
                <div className="text-white font-bold text-xl sm:text-6xl">LOGO</div>
              </div>
            </div>

            {/* Lado Derecho - Contenido */}
            <div className="flex p-4 m-4 rounded-md ml-4 sm:w-1/2">
              <div className="flex flex-col justify-start">
                <h1 className="font-bold lg:text-6xl md:text-4xl sm:text-2xl text-5xl text-gray-900">
                  Crea videos ahora
                </h1>
                <p className="font-bold mt-5 lg:text-3xl md:text-xl sm:text-lg text-xl text-gray-700">Unite hoy.</p>

                {/* Botón Crear Cuenta */}
                <Button asChild variant={"default"} className="mt-5 rounded-full h-12 text-base font-medium">
                  <Link to="/register">Crear una cuenta</Link>
                </Button>

                {/* Separador */}
                <div className="flex items-center my-5">
                  <div className="flex-1 h-px bg-gray-400" />
                  <p className="mx-4 text-gray-500 text-sm">o</p>
                  <div className="flex-1 h-px bg-gray-400" />
                </div>

                {/* Texto y Botón Login */}
                <p className="font-bold text-lg text-gray-900">¿Ya tenés una cuenta?</p>
                <Button asChild variant={"outline"} className="mt-1 rounded-full h-12 text-base font-medium">
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