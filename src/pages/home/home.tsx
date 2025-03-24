import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import { useLocation } from "react-router-dom";
// import { ReactNode } from "react";

// interface HomeProps{
//     children: ReactNode;
// }

const Home = () => {

  return (
    <Fragment>

        <Navbar />
        
        <h1>Bienvenido a aprendiendo con personajes</h1>

    </Fragment>
  )
}

export default Home