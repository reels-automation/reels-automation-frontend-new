import { ReactNode } from "react";
import { Link } from 'react-router-dom';

interface NavbarButtonProps {
    url: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

function NavbarButton({ url, children, className, onClick }: NavbarButtonProps) {
  
  const classNameModified = className || "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500";

  const onClickSpecific = onClick || (() => console.log("Skipeando metodo onClick"));

  return (
    <li>
      <Link
        to={url}
        className={classNameModified}
        onClick={onClickSpecific}>
          {children}
      </Link>
    </li>
  );
}

export default NavbarButton;
