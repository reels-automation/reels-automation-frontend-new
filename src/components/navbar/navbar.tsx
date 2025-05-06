import { useState, useRef, useEffect } from "react";
import NavbarLogo from "./components/navbarLogo";
import NavbarButton from "./components/navbarButton";
import NavbarButtonsContainer from "./components/navbarButtonContainer";
import { useAuth } from "../../context/authContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState("Usuario")
  const burgerRef = useRef(null);

  const logo_image = "https://th.bing.com/th/id/R.39928ef71f5fa16f2c51031b4e182aab?rik=8O1Usrx4O2rbJQ&pid=ImgRaw&r=0";
  const home_route = "/";
  const { isLoggedIn, logout } = useAuth();

  function getSubFromToken(): string  {
    try {
      const token = localStorage.getItem("authToken"); // Cambia esto por tu clave real
      if (!token) return "";
  
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
  
      return decoded.username; // Esto ahora se espera que sea string (UUID)
    } catch (err) {
      console.error("Error decoding token", err);
      return "";
    }
  }

  useEffect(() => {
      const username = getSubFromToken();
      if (username !== null) {
        setUser(username)
      }
    }, []);

  const startButtons = isLoggedIn
    ? []
    : [];

  const endButtons = isLoggedIn
    ? [
        
      <Popover>
  <PopoverTrigger><Avatar className="w-12 h-12">
        <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
        <AvatarFallback>{user[0]}</AvatarFallback>
      </Avatar>
      </PopoverTrigger>

  <PopoverContent className="w-56 p-4">
    <div className="flex flex-col items-center text-center space-y-2">
      
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
        <AvatarFallback>{user[0]}</AvatarFallback>
      </Avatar>
      <div className="font-medium text-sm">{user}</div>
    </div>

    <Separator className="my-4" />

    {/* Botones tipo lista */}
    <div className="flex flex-col">
      <Button
        variant="ghost"
        className="justify-start w-full hover:bg-muted px-3 py-2"
        onClick={() => navigate("/mis-videos")}
      >
        Mis Videos
      </Button>
      <Button
        variant="ghost"
        className="justify-start w-full hover:bg-muted px-3 py-2"
        onClick={logout}
      >
        Cerrar sesión
      </Button>
    </div>
  </PopoverContent>
</Popover>

      ]
    : [
        <NavbarButton key="login" url="/login" className="text-center">Iniciar Sesión</NavbarButton>,
        <NavbarButton key="register" url="/register" className="text-center">Registrarse</NavbarButton>
      ];

  return (
    <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between p-4 mx-auto relative">
        
        <NavbarLogo url={home_route} image={logo_image}>
          Aprendiendo con personajes
        </NavbarLogo>

        

        {/* Burger button */}
        <div className="relative">
          <button 
            ref={burgerRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="sm:hidden text-gray-700 dark:text-gray-300 focus:outline-none hover:cursor-pointer"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>

          {/* Popup menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-20">
              <ul className="flex flex-col py-2 list-none">
                {/* {startButtons.map((button, index) => (
                  <li
                    key={`start-${index}`}
                    className="px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 text-center"
                  >
                    <a href={button.props.url} className="block w-full h-full">
                      {button.props.children}
                    </a>
                  </li>
                ))} */}
                {endButtons.map((button, index) => (
                  <li
                    key={`end-${index}`}
                    className="px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 text-center"
                  >
                    <a href={button.props.url} className="block w-full h-full">
                      {button.props.children}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Desktop nav */}
        <div className="hidden sm:flex sm:items-center">
          <NavbarButtonsContainer start={startButtons} center={[]} end={endButtons} />
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
