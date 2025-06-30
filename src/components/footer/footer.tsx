import { Mail, Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AP</span>
              </div>
              <span className="text-gray-900 font-bold text-lg">Aprendiendo con Personajes</span>
            </div>
            <p className="text-gray-600 text-sm">
              Crea videos increíbles con tus personajes favoritos usando inteligencia artificial. 
              La herramienta perfecta para content creators y educadores.
            </p>
          </div>

          {/* Links Section (oculto si está vacío) */}
          <div className="space-y-4">
            {/* Puedes agregar enlaces útiles aquí si los necesitas */}
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-gray-900 font-semibold text-lg">Contacto</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <a
                  href="https://www.instagram.com/aprendiendo.con.personajes/"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
                  aria-label="Instagram"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <span className="ml-4 text-gray-600 text-sm">@aprendiendo.con.personajes</span>
              </div>
              <div className="flex items-center">
                <a
                  href="https://x.com/con_personajes"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
                  aria-label="Twitter"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <span className="ml-4 text-gray-600 text-sm">@con_personajes</span>
              </div>
              <div className="flex items-center">
                <a
                  href="https://github.com/reels-automation"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
                  aria-label="GitHub"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
                <span className="ml-4 text-gray-600 text-sm">reels-automation-project</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-600" />
                <span className="ml-4 text-gray-600 text-sm">hawktuahlacacatua@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              {/* Puedes agregar un mensaje aquí si lo deseas */}
            </div>
            <div className="text-gray-600 text-sm">
              © 2024 Aprendiendo con Personajes. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;