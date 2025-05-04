import { useState, useRef } from "react";
import NavbarLogo from "./components/navbarLogo";
import NavbarButton from "./components/navbarButton";
import NavbarButtonsContainer from "./components/navbarButtonContainer";
import { useAuth } from "../../context/authContext";
import { Button } from "@/components/ui/button"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerRef = useRef(null);

  const logo_image = "https://th.bing.com/th/id/R.39928ef71f5fa16f2c51031b4e182aab?rik=8O1Usrx4O2rbJQ&pid=ImgRaw&r=0";
  const home_route = "/";
  const { isLoggedIn, logout } = useAuth();

  const startButtons = isLoggedIn
    ? [<NavbarButton key="create_video" url="/create-video">Crear video</NavbarButton>]
    : [];

  const endButtons = isLoggedIn
    ? [
        <NavbarButton 
          key="logout" 
          url="/login" 
          onClick={() => logout()} 
          className="text-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </NavbarButton>
      ]
    : [
        <NavbarButton key="login" url="/login" className="text-center">Sign in</NavbarButton>,
        <NavbarButton key="register" url="/register" className="text-center">Sign up</NavbarButton>
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
                {startButtons.map((button, index) => (
                  <li
                    key={`start-${index}`}
                    className="px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 text-center"
                  >
                    <a href={button.props.url} className="block w-full h-full">
                      {button.props.children}
                    </a>
                  </li>
                ))}
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
