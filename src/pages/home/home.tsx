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
      <h2>Reproductor de Video</h2>
      <video width="640" height="360" controls>
        <source src={"http://localhost:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3ZpZGVvcy1ob21lcm8vaGFibGFtZSUyMGRlJTIwbGElMjBidXJvY3JhY2lhJTIwZGUlMjBsb3MlMjBjb25jbGF2ZXMlMjBkZSUyMGxhJTIwaWdsZXNpYSUyMHklMjBlbCUyMHBhcGElMjBmcmFuY2lzY28ubXA0P1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9V1oyUDhPVUpJMUNKMkhRRzROMFAlMkYyMDI1MDQyOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA0MjlUMjM0MDA5WiZYLUFtei1FeHBpcmVzPTQzMTk5JlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKWFdqSlFPRTlWU2treFEwb3lTRkZITkU0d1VDSXNJbVY0Y0NJNk1UYzBOakF4TWpjd015d2ljR0Z5Wlc1MElqb2lRVXRKUVVsUFUwWlBSRTVPTjBWWVFVMVFURVVpZlEucTAyNWdDY3YwUHZvNmtYMS1BVS1talpmSk13a0Y4ME9LT3I4NnhUazZnRVNMTlFadHp2Q0Y1UFJhcjVMTlNNQ2FpU21TVTVXYi1fclFqTjNMWEthM2cmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT1iMGFlODVlMzI4Y2FkNDkxZGZkYzJiYWE5MThiYjMwYjExMzMxMWViMmUzMTFlYmFiYjkwMzBiNDI0ZmJhYTM3"} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
    
        </main>

        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;