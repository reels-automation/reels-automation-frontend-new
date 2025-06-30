import { Fragment } from "react/jsx-runtime";
import CreateVideoPopUp from "./create_video_popup";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { initMercadoPago } from "@mercadopago/sdk-react";
import { API_URL } from "@/fetchs/api";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Play, CreditCard, CheckCircle, Sparkles } from "lucide-react";

export const PUBLIC_KEY_MP = import.meta.env.VITE_PUBLIC_KEY_MP;

console.log("caca ", PUBLIC_KEY_MP)

initMercadoPago(PUBLIC_KEY_MP, {
  locale: "es-AR",
});

// Función para obtener el UUID del token
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

// Función para iniciar el pago
async function handlePayment() {
  const userId = getSubFromToken();
  if (!userId) {
    alert("No estás autenticado.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}${"/mercadopago/preference"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (!response.ok) {
      throw new Error("No se pudo crear la preferencia de pago.");
    }

    const data = await response.json();
    window.location.href = data.init_point; // Redireccionar a MercadoPago
  } catch (err) {
    console.error("Error al iniciar el pago:", err);
    alert("Error al iniciar el pago.");
  }
}

const HomeMain = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopOver, setPopOver] = useState(false);
  const [seconds, setSeconds] = useState(0)

  const maxTime = 10;

  function closePopUp(){
    setIsPopupOpen(false)
  }

  function closePopUpMEssage(){
    setIsPopupOpen(false)
    setPopOver(true)
  }

  const openPopup = () => setIsPopupOpen(true);

  useEffect(() => {
    let time:NodeJS.Timeout;
  
    if (isPopOver) {
      time = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          if (newSeconds >= maxTime) {
            setPopOver(false);
            return maxTime;
          }
          return newSeconds;
        });
      }, 1000);
    }
  
    return () => {
      if (time) {
        clearInterval(time);
      }
    };
  }, [isPopOver]); // Only depend on isPopOver


  return (
    <Fragment>
      <div className="min-h-screen w-full bg-white">
        <div className="w-full max-w-6xl mx-auto pt-16 pb-8">
          <div className="flex flex-col items-center space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="relative mx-auto">
                <div className="w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full flex items-center justify-center shadow-xl mx-auto border-4 border-white">
                  <span className="text-purple-600 font-bold text-5xl sm:text-7xl">AP</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100/30 to-blue-100/30"></div>
              </div>
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 text-center leading-tight">
                  APRENDIENDO CON
                  <span className="block text-purple-600">
                    PERSONAJES
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                  Crea videos increíbles con tus personajes favoritos usando inteligencia artificial
                </p>
              </div>
            </div>

            {/* Success Message */}
            {isPopOver && (
              <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800 max-w-md mx-auto shadow-lg">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <AlertTitle className="font-bold text-emerald-800">¡Video en proceso!</AlertTitle>
                <AlertDescription className="text-emerald-700">
                  Tu video se está creando. En breve lo verás en la sección "Mis videos". Si tienes algún problema viendo tu video dirigite a nuestro mail de contacto.
                </AlertDescription>
                <AlertDescription className="text-emerald-600 text-sm mt-2">
                  Este mensaje desaparecerá en: {Math.max(0, maxTime - seconds)}s
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button 
                onClick={openPopup}
                className="flex-1 h-14 px-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Play className="mr-2 h-5 w-5" />
                Crear Video
              </Button>

              <Button 
                onClick={handlePayment}
                variant="outline"
                className="flex-1 h-14 px-8 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Comprar Créditos
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Videos Personalizados</h3>
                <p className="text-gray-600 text-sm">Crea contenido único con tus personajes favoritos</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Inteligencia Artificial</h3>
                <p className="text-gray-600 text-sm">Genera guiones automáticamente o usa los tuyos</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sistema de Créditos</h3>
                <p className="text-gray-600 text-sm">Paga solo por lo que uses, sin suscripciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CreateVideoPopUp isOpen={isPopupOpen} closePopup={closePopUp} closePopupMessage={closePopUpMEssage} />
    </Fragment>
  );
}

export default HomeMain;
