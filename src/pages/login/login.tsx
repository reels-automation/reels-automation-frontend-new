// src/pages/login/login.tsx

import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import { loginPost } from "../../fetchs/login/login-post";
import LoginForm from "./components/loginForm";

const Login = () => {
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await loginPost("/login", username, password);
      console.log("Login success:", response);

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <LoginForm onSubmit={handleLogin} />
    </Fragment>
  );
};

export default Login;
