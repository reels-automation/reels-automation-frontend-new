
import { ReactNode } from "react";
import { Link } from 'react-router-dom';

interface NavbarButtonProps{
    url: string;
    children: ReactNode;
}

function NavbarButton({ url, children }: NavbarButtonProps) {
  return (
    <li>
      <Link
        to={url}
        className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
            {children}
      </Link>
    </li>
  );
}

export default NavbarButton;