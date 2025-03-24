function Navbar() {
  return (
    <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 mx-auto">
        
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 ml-4">
          <img 
            src="https://th.bing.com/th/id/R.39928ef71f5fa16f2c51031b4e182aab?rik=8O1Usrx4O2rbJQ&pid=ImgRaw&r=0" 
            className="h-8" 
            alt="Flowbite Logo" 
          />
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
            Aprendiendo con Personajes
          </span>
        </a>

        {/* Navbar Items - Right-aligned */}
        <div className="hidden md:flex md:flex-1 md:justify-end mr-4">
          <ul className="flex space-x-8">
            <li>
              <a href="/login" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
                Sign In
              </a>
            </li>
            <li>
              <a href="/register" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;