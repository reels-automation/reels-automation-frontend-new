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
          if (newSeconds === maxTime) {
            setPopOver(false);
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
      <div className="flex flex-col items-center space-y-2">
        <img 
          src="https://imagenes.20minutos.es/files/image_640_auto/uploads/imagenes/2017/09/29/550750.jpg" 
          alt="logo" 
          className="w-48 h-48 rounded-full border-6 border-white"
        />
        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl mt-4 mb-2 text-center">
          APRENDIENDO CON PERSONAJES
        </h1>

        {isPopOver === true ? (
          
          <Alert className="mt-4 bg-green-100 border-green-400 text-green-700 w-96 text-center">
          <AlertTitle className="font-bold" >Video Creado !</AlertTitle>
          <AlertDescription className="font-bold" >Ya se ha creado tu video</AlertDescription>
          <AlertDescription>En breve lo veras en la seccion "Mis videos"</AlertDescription>
          <AlertDescription>Este mensaje desaparecera en: {maxTime - seconds}</AlertDescription>
        </Alert>
        ): (
          <h2></h2>
        )
        }

        <div className="grid grid-cols-3 gap-4 w-full max-w-xl mt-4 mb-4">
          <div></div>
            <div>
              <Button variant="outline" className="
                w-full h-12 px-6
                rounded-lg
                focus:shadow-outline
                bg-slate-300 hover:bg-slate-400
                mt-4 mb-4
                font-semibold text-lg font-poppins
                " onClick={openPopup}> Crear video 
              </Button>

              <Button variant="outline" className="
                w-full h-12 px-6
                rounded-lg
                focus:shadow-outline
                bg-zinc-300 hover:bg-zinc-400 
                mt-4 mb-4
                font-semibold text-lg font-poppins
                " onClick={handlePayment}> Comprar créditos
              </Button>
            </div>
        </div>
        <CreateVideoPopUp isOpen={isPopupOpen} closePopup={closePopUp} closePopupMessage={closePopUpMEssage} />
      </div>
    </Fragment>
  );
}

export default HomeMain;
