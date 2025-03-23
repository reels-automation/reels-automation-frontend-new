
import NavbarButton from './navbarbutton';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex space-x-4">
        <NavbarButton url="/">Home</NavbarButton>
        <NavbarButton url="/login">Login</NavbarButton>
        <NavbarButton url="/register">Register</NavbarButton>
      </div>
    </nav>
  );
}

export default Navbar;
