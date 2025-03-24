import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import { registerPost } from "../../fetchs/register/register-post";
import RegisterForm from "./components/registerForm";

const Register = () => {

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      const response = await registerPost("/register", username, email, password);
      console.log("Registration success:", response);

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Fragment>

      <Navbar />
      <RegisterForm onSubmit={handleRegister} />
      
    </Fragment>
  );
};

export default Register;
