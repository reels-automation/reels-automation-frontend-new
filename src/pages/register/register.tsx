import { Fragment, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { registerPost } from "../../fetchs/register/register-post";
import RegisterForm from "./components/registerForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Register = () => {
  const navigate = useNavigate();  
  const {isLoggedIn} = useAuth();
  
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
    }
  }, [isLoggedIn, navigate]); 

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      const response = await registerPost("/register", username, email, password);
      console.log("Registration success:", response);
      setError(false);
      navigate("/");
      window.location.reload()

    } catch (error: unknown) {
      console.error("Registration failed:", error);
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
      
      <RegisterForm onSubmit={handleRegister} error={isError ? errorMessage : null} />
      
    </Fragment>
  );
};

export default Register;
