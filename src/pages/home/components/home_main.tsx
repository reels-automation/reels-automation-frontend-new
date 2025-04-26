import { Fragment } from "react/jsx-runtime";
import CreateVideoPopUp from "./create_video_popup";
import { useState } from "react";

const HomeMain = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);

  const closePopup = () => setIsPopupOpen(false);

  return (
    <Fragment>
      <div className="flex flex-col items-center">
        <img 
          src="https://imagenes.20minutos.es/files/image_640_auto/uploads/imagenes/2017/09/29/550750.jpg" 
          alt="logo" 
          className="w-48 h-48 rounded-full border-6 border-white"
        />
        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl mt-4 mb-2 text-center">
          LEARNING WITH CHARACTERS
        </h1>


        <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 mb-2"
          onClick={openPopup}
        >
          Create Video
        </button>
        <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 mb-2">
          Donate
        </button>

        <CreateVideoPopUp isOpen={isPopupOpen} closePopup={closePopup} />
      </div>
    </Fragment>
  );
}

export default HomeMain;
