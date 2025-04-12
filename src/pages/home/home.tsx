import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// import { ReactNode } from "react";

// interface HomeProps{
//     children: ReactNode;
// }

const Home = () => {

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow px-4 py-8">
        </main>

        <Footer />
      </div>
    </Fragment>
  )
}

export default Home