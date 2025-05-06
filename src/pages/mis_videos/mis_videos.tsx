import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const MisVideos = () => {
  const bgColor = "#f3f4f6";
  return (
    <Fragment> 
        <Navbar />
        <main className="flex-grow px-4 py-8 mt-10">
            <h1>Mis Videos</h1>
        </main>
    <Footer />
    </Fragment>
  );
};

export default MisVideos;