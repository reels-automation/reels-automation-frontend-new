import NavbarLogo from "./components/navbarLogo";
import NavbarButton from "./components/navbarButton";
import NavbarButtonsContainer from "./components/navbarButtonContainer";

import { useAuth } from "../../context/authContext";

function Navbar() {
  const logo_image = "https://th.bing.com/th/id/R.39928ef71f5fa16f2c51031b4e182aab?rik=8O1Usrx4O2rbJQ&pid=ImgRaw&r=0";
  const home_route = "/";

  const {isLoggedIn, logout} = useAuth();

  return (
    <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 mx-auto">
        <NavbarLogo url={home_route} image={logo_image}>
          Aprendiendo con personajes
        </NavbarLogo>

        <NavbarButtonsContainer
          start={isLoggedIn ? 
            [
              <NavbarButton key="create_video" url="/create-video">Crear video</NavbarButton>,
            ]:
            [

          ]}
          center={[
          ]}
          end={

            isLoggedIn ? 
            [
            <NavbarButton key="logout" url="/login" onClick={() => logout()} 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700" >
              Logout
            </NavbarButton>
            ]:
            [
            <NavbarButton key="login" url="/login">Sign in</NavbarButton>,
            <NavbarButton key="register" url="/register">Sign up</NavbarButton>
          ]

        }
        />
      </div>
    </nav>
  );
}

export default Navbar;