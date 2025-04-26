import { Fragment } from "react/jsx-runtime";

const HomeMain = () => {
  return (
    <Fragment>
      <div className="flex flex-col items-center">
        <img 
          src="https://imagenes.20minutos.es/files/image_640_auto/uploads/imagenes/2017/09/29/550750.jpg" 
          alt="logo" 
          className="w-48 h-48 rounded-full border-6 border-white"
        />
        <h1 className="text-5xl">LEARNING WITH CHARACTERS</h1>
      </div>
    </Fragment>
  );
}

export default HomeMain;
