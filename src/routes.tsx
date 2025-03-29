
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import UserProfile from "./pages/userprofile/UserProfile";
import {Route, Routes } from "react-router-dom";
import VideoSubmissionForm from "./components/publish-video/VideoSubmissionForm";
function RoutesManager() {
  return (
        <Routes>
            <Route path="/" element={Home()} />
            <Route path="/login" element={Login()}></Route>
            <Route path="/register" element={Register()}></Route>
            <Route path="/create-video" element={VideoSubmissionForm()}></Route>
            <Route path="/profile" element={UserProfile()}></Route>
        </Routes>
  );
}

export default RoutesManager;