
import { ReactNode } from "react";
import { Link } from 'react-router-dom';

interface NavbarButtonProps{
    url: string;
    children: ReactNode;
}

function NavbarButton({ url, children }: NavbarButtonProps) {
  return (
    <Link
      to={url}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  );
}

export default NavbarButton;