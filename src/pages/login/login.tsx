import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { loginPost } from "../../fetchs/login/login-post";
import LoginForm from "./components/loginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  
  const {isLoggedIn} = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
     // navigate("/");  // Redirigir a la página principal si ya está logueado
    }
  }, [isLoggedIn, navigate]);  // Dependencia en isLoggedIn y navigate

  const handleLogin = async (username: string, password: string) => {
    try {
      const token = await loginPost("/login", username, password);
      console.log("Login success:", token);
      //navigate("/");

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Fragment>

      <Navbar />
      <LoginForm onSubmit={handleLogin} />
      <Footer />

    </Fragment>
  );
};

export default Login;
