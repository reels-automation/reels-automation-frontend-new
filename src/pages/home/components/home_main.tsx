import { Fragment } from "react/jsx-runtime";
import CreateVideoPopUp from "./create_video_popup";
import { useState } from "react";
import { Button } from "@/components/ui/button"

const HomeMain = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);

  const closePopup = () => setIsPopupOpen(false);

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
                " onClick={openPopup}> Comprar créditos
              </Button>
            </div>
        </div>
        <CreateVideoPopUp isOpen={isPopupOpen} closePopup={closePopup} />
      </div>
    </Fragment>
  );
}

export default HomeMain;
