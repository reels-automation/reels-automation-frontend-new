import { useState, useRef, useEffect } from "react";
import NavbarLogo from "./components/navbarLogo";
import NavbarButton from "./components/navbarButton";
import NavbarButtonsContainer from "./components/navbarButtonContainer";
import { useAuth } from "../../context/authContext";
//import { Label } from "@/components/ui/label";
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
        onClick={() => navigate("/")}
      >
        Inicio
      </Button>

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
            
            {/* Logo - Solo visible en desktop */}
            <div className="hidden sm:block" >
            <NavbarLogo 
              url={home_route} 
              image={logo_image}
     // Oculto en móvil
            >
              Aprendiendo con personajes
            </NavbarLogo>
    

            </div>
            
            {/* Avatar móvil - Solo visible cuando está logueado en móvil */}
            {isLoggedIn && (
              <div className="sm:hidden ml-2">
                <Popover>
                  <PopoverTrigger>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
                      <AvatarFallback>{user[0]}</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 mt-2 mr-2">
                    <div className="flex flex-col">
                    <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => navigate("/")}
                      >
                        Inicio
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => navigate("/mis-videos")}
                      >
                        Mis Videos
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={logout}
                      >
                        Cerrar sesión
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
    
            {/* Controles derecha */}
            <div className="flex items-center gap-4">
              {/* Menú móvil */}
              <div className="sm:hidden">
                {!isLoggedIn && (
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="text-gray-700 dark:text-gray-300 focus:outline-none"
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 6h16M4 12h16M4 18h16" 
                      />
                    </svg>
                  </button>
                )}
                
                {/* Menú desplegable móvil */}
                {isMenuOpen && (
                  <div className="absolute top-12 right-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                    {!isLoggedIn ? (
                      <>
                        <NavbarButton 
                          url="/login" 
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Iniciar Sesión
                        </NavbarButton>
                        <NavbarButton 
                          url="/register" 
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Registrarse
                        </NavbarButton>
                      </>
                    ) : (
                      <div className="flex flex-col">
                        <Button
                          variant="ghost"
                          className="justify-start"
                          onClick={() => {
                            navigate("/");
                            setIsMenuOpen(false);
                          }}
                        >
                          Inicio
                        </Button>

                        <Button
                          variant="ghost"
                          className="justify-start"
                          onClick={() => {
                            navigate("/mis-videos");
                            setIsMenuOpen(false);
                          }}
                        >
                          Mis Videos
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start"
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                        >
                          Cerrar sesión
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
    
              {/* Desktop nav */}
              <div className="hidden sm:flex">
                <NavbarButtonsContainer end={endButtons} />
              </div>
            </div>
          </div>
        </nav>
      );
    }

export default Navbar;
