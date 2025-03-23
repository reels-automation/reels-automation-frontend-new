import { Fragment } from "react/jsx-runtime";
import { ReactNode } from "react";

interface ButtonProps{
    children: ReactNode;
    onClick: () => void;
}

const Button = ({children, onClick}: ButtonProps) => {
  return (
    <Fragment>
        <button 
        className="Button"
        onClick={onClick}>
            <p>{children}</p>
        </button>
    </Fragment>
  )
}

export default Button