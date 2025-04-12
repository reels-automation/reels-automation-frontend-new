import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import { registerPost } from "../../fetchs/register/register-post";
import RegisterForm from "./components/registerForm";
import Footer from "../../components/footer/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Register = () => {
  const navigate = useNavigate();  
  const {isLoggedIn} = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      //navigate("/");  
    }
  }, [isLoggedIn, navigate]); 

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      const response = await registerPost("/register", username, email, password);
      console.log("Registration success:", response);
     // navigate("/");

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Fragment>

      <Navbar />
      <RegisterForm onSubmit={handleRegister} />
      <Footer />
      
    </Fragment>
  );
};

export default Register;
