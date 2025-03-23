import { Fragment } from "react/jsx-runtime";
import { ReactNode } from "react";

interface AlertProps{
    children: ReactNode;
}

const Alert = ({ children }: AlertProps) => {
  return (
    <Fragment>
        <div className={`Alert`}>Error: {children}</div>
    </Fragment>
  )
}

export default Alert