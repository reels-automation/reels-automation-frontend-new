import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import HomeMain from "./components/home_main";
import CreateVideoPopUp from "./components/create_video_popup";

// import { ReactNode } from "react";

// interface HomeProps{
//     children: ReactNode;
// }

const Home = () => {

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col bg-gray-200">
        <Navbar />

        <main className="flex-grow px-4 py-8 mt-10">
          <HomeMain />
        </main>

        <Footer />
      </div>
    </Fragment>
  )
}

export default Home