
import { ReactNode } from "react";
import { Link } from 'react-router-dom';

interface NavbarLogoProps{
    url: string;
    children: ReactNode;
    image: string;
}

function NavbarLogo({ url, children, image }: NavbarLogoProps) {
  return (
    <Link
      to={url}
      className="flex items-center space-x-3 ml-4 mr-10">
        <img 
          src={image}
          className="h-8" 
          alt="Logo" 
        />
        <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
          {children}
        </span>
    </Link>

  );
}

export default NavbarLogo;