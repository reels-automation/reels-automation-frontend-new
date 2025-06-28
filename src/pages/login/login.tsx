import { useState } from "react"
import { useEffect } from "react"
import { loginPost } from "../../fetchs/login/login-post"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import EyePassword from "@/components/eye_password/eye_password"
import type React from "react"
import HomeButton from "@/components/home_button/home_button"

const Login = () => {
  const navigate = useNavigate()

  const { isLoggedIn } = useAuth()
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
    }
  }, [isLoggedIn, navigate])

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const token = await loginPost("/login", username, password)
      console.log("Login success:", token)
      setError(false)
      setErrorMessage(null)
      navigate("/")
      window.location.reload()
    } catch (error: unknown) {
      console.error("Login error:", error)
      setError(true)
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("An unknown error occurred.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Función para manejar el submit del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    if (username && password) {
      await handleLogin(username, password)
    }
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
      <HomeButton />
      {/* Contenedor principal con fondo y efecto de desenfoque */}
      <div className="h-screen w-full p-2.5">
        <div className="h-full w-full bg-white/10 backdrop-blur-sm rounded-lg">
          {/* STACK MODEL: Contenido apilado verticalmente en móvil */}
          <div className="flex flex-col lg:flex-row h-full">
            {/* Formulario */}
            <div className="w-full lg:w-1/2 flex-1 lg:h-full flex items-center justify-center lg:mr-5 lg:justify-end p-4 sm:p-6 order-2 lg:order-1 lg:p-8 lg:pr-4">
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-md">
                <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                  <CardHeader className="pb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                      Inicia sesión con tu cuenta
                    </h1>
                  </CardHeader>

                  <CardContent className="space-y-4 sm:space-y-6">
                    <form className="space-y-2 sm:space-y-3 lg:space-y-4" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Nombre de usuario
                        </label>
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Ingresa tu nombre de usuario"
                          className="h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Contraseña
                        </label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Tu contraseña"
                            className="h-10 sm:h-12 px-3 sm:px-4 pr-10 sm:pr-12 text-sm sm:text-base border-gray-300 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                          <EyePassword showPassword={showPassword} setShowPassword={setShowPassword} />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-10 sm:h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm sm:text-base mt-4 sm:mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Iniciando sesión...
                          </>
                        ) : (
                          "Iniciar sesión"
                        )}
                      </Button>

                      {isError && errorMessage && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                      )}
                    </form>

                    <div className="text-center pt-3 sm:pt-4 border-t border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-600">
                        ¿No tienes una cuenta?{" "}
                        <Link
                          to="/register"
                          className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors"
                        >
                          Regístrate
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contenido adicional */}
            <div className="w-full lg:w-1/2 flex-shrink-0 min-h-0 lg:h-full flex items-center lg:ml-5 lg:justify-start justify-center py-2 sm:py-3 lg:py-8 lg:pl-4 order-1 lg:order-2">
              <div className="text-center text-white">
                <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2 lg:mb-6">Bienvenido de vuelta</h2>
                <p className="text-xs sm:text-sm lg:text-xl text-white/80 mb-2 sm:mb-4 lg:mb-8 max-w-md">
                  Accede a tu cuenta y comenzá a crear videos.
                </p>
                {/* <div className="hidden sm:block space-y-1 lg:space-y-4 text-white/60">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    <span className="text-xs lg:text-base">Acceso seguro y rápido</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
