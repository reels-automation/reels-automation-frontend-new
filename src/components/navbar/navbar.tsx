import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Home } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y saludo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">AP</span>
              </div>
              <span className="text-white font-bold text-lg hidden sm:block">
                Aprendiendo con Personajes
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
              >
                <Home className="h-4 w-4 mr-1" />
                Inicio
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link
                    to="/mis-videos"
                    className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    Mis Videos
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-white hover:text-purple-200 hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Cerrar Sesión
                  </Button>
                  {isLoggedIn && user?.name && (
                  <span className="text-white font-medium text-base ml-4 hidden md:block">Hola, {user.name}</span>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-2 border-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                      Registrarse
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              className="text-white hover:text-purple-200 hover:bg-white/10"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-md rounded-lg mt-2 border border-white/20 mb-4">
              <Link
                to="/"
                className="text-white hover:text-purple-200 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4 mr-2 inline" />
                Inicio
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link
                    to="/mis-videos"
                    className="text-white hover:text-purple-200 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2 inline" />
                    Mis Videos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-purple-200 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                  >
                    <LogOut className="h-4 w-4 mr-2 inline" />
                    Cerrar Sesión
                  </button>
                  {user?.name && (
                    <span className="block text-white font-medium text-base px-3 py-2">Hola, {user.name}</span>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-purple-200 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 text-center shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;