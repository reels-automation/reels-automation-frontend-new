import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import HomeMain from "./components/home_main";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const Home = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successTitle, setSuccessTitle] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("registered") === "true") {
      setShowSuccessAlert(true)
      window.history.replaceState({}, "", window.location.pathname)

      setSuccessTitle("¡Cuenta creada exitosamente!")
      setSuccessMessage("Tu cuenta ha sido registrada correctamente.")

      setTimeout(() => {
        setShowSuccessAlert(false)
      }, 5000)
    }
    else if (urlParams.get("logged") === "true") {
      setShowSuccessAlert(true)
      window.history.replaceState({}, "", window.location.pathname)

      setSuccessTitle("¡Inicio de sesión exitoso!")
      setSuccessMessage("Inciaste sesión correctamente, disfruta de nuestros servicios.")

      setTimeout(() => {
        setShowSuccessAlert(false)
      }, 5000)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Alert */}
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
          showSuccessAlert ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <Alert className="bg-white border-emerald-200 text-emerald-800 shadow-lg min-w-96">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <AlertTitle className="text-emerald-800 font-semibold">{successTitle}</AlertTitle>
          <AlertDescription className="text-emerald-700">
            {successMessage}
          </AlertDescription>
        </Alert>
      </div>
      
      <Navbar />
      <main className="flex-grow px-4 py-8">
        <HomeMain />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
