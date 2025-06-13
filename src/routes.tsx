
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import UserProfile from "./pages/userprofile/UserProfile";
import {Route, Routes } from "react-router-dom";
import VideoSubmissionForm from "./components/publish-video/VideoSubmissionForm";
import MisVideos from "./pages/mis_videos/mis_videos";
import NotGuestRoute from "./context/protected_routes/protectedRoute";
import Guest from "./pages/guest/guest";
function RoutesManager() {
  return (
    <Routes>
        <Route element={<NotGuestRoute exceptRoutes={['/login', '/register']}/>}>
          <Route path="/" element={Home()} />
          <Route path="/create-video" element={VideoSubmissionForm()}></Route>
          <Route path ="/mis-videos" element={MisVideos()}></Route>
          <Route path="/profile" element={UserProfile()}></Route>
        </Route>

        <Route path="/guest" element={Guest()}></Route>
        <Route path="/login" element={Login()}></Route>
        <Route path="/register" element={Register()}></Route>
    </Routes>
  );
}

export default RoutesManager;