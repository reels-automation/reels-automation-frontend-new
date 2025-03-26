import { ReactNode } from "react";

interface NavbarButtonsContainerProps {
  start?: ReactNode[];
  center?: ReactNode[];
  end?: ReactNode[];
}

function NavbarButtonsContainer({ start = [], center = [], end = [] }: NavbarButtonsContainerProps) {
  return (
    <div className="flex flex-1 justify-between items-center">
      <ul className="flex justify-start space-x-4">{start}</ul>
      <ul className="flex justify-center space-x-4 flex-1">{center}</ul>
      <ul className="flex justify-end space-x-10">{end}</ul>
    </div>
  );
}

export default NavbarButtonsContainer;