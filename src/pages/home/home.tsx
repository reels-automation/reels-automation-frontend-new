import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import HomeMain from "./components/home_main";


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-8 mt-10">
        <HomeMain />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
