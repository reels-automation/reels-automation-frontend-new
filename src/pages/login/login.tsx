import { Fragment, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { useEffect } from "react";
import { loginPost } from "../../fetchs/login/login-post";
import LoginForm from "./components/loginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  
  const { isLoggedIn } = useAuth();
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  
  
  useEffect(() => {
    if (isLoggedIn) {
    
    }

  }, [isLoggedIn, navigate]);

  const handleLogin = async (username: string, password: string) => {
    try {
      const token = await loginPost("/login", username, password);
      console.log("Login success:", token);
      setError(false);

      navigate("/"); 
      window.location.reload();

    } catch (error: unknown) { 
      console.error("Login error:", error);
      setError(true);

      if (error instanceof Error) {
        setErrorMessage(error.message);  
      } else {
        setErrorMessage("An unknown error occurred.");  
      }
    }
  };

  return (
    <Fragment>
      <Navbar></Navbar>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <LoginForm onSubmit={handleLogin} error={isError ? errorMessage : null} />
        </main>
      </div>
    </Fragment>
  );
};

export default Login;
