import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import HomeMain from "./components/home_main";

const Home = () => {
  const bgColor = "#f3f4f6";

  return (
    <Fragment>
      <div
        className={`min-h-screen flex flex-col`}
        style={{ backgroundColor: bgColor }}
      >
        <Navbar />

        <main className="flex-grow px-4 py-8 mt-10">
          <HomeMain />
          <div>
          </div>
        </main>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;