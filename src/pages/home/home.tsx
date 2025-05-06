import { Fragment } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import HomeMain from "./components/home_main";


const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <main className="flex-grow px-4 py-8 mt-10" style={{ backgroundColor: "#f3f4f6" }}>
        <HomeMain />
        <div className="mt-8">          
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Home;
