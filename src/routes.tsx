
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import {Route, Routes } from "react-router-dom";

function RoutesManager() {
  return (
        <Routes>
            <Route path="/" element={Home()} />
            <Route path="/login" element={Login()}></Route>
            <Route path="/register" element={Register()}></Route>
        </Routes>
  );
}

export default RoutesManager;