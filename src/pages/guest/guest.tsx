import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Guest = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex sm:flex-row flex-col">
          <div className="rounded-md flex sm:justify-center sm:items-center p-4 m-4 sm:w-1/2">
            <img
              className="w-16 h-auto sm:w-96"
              src="https://lens-storage.storage.googleapis.com/png/bb4352e639a04511875104672e95af13"
              alt=""
            />
          </div>
          <div className="flex p-4 m-4 rounded-md ml-4 sm:w-1/2">
            <div className="flex flex-col justify-start">
              <h1 className="font-bold lg:text-6xl md:text-4xl sm:text-2xl text-5xl">Crea videos ahora</h1>
              <p className="font-bold mt-5 lg:text-3xl md:text-xl sm:text-lg text-xl">Unite hoy.</p>
              <Button asChild variant={"default"} className="mt-5 rounded-full">
                <Link to="/register">Crear una cuenta</Link>
              </Button>
              <div className="flex items-center my-5">
                <div className="flex-1 h-px bg-gray-400" />
                <p className="mx-4 text-gray-500 text-sm">o</p>
                <div className="flex-1 h-px bg-gray-400" />
              </div>
              <p className="font-bold text-lg">¿Ya tenés una cuenta?</p>
              <Button asChild variant={"outline"} className="mt-1 rounded-full">
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Guest;