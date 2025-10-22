import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import UserProfile from "./pages/userprofile/UserProfile";
import { Route, Routes } from "react-router-dom";
import VideoSubmissionForm from "./components/publish-video/VideoSubmissionForm";
import MisVideos from "./pages/mis_videos/mis_videos";
import NotGuestRoute from "./context/protected_routes/protectedRoute";
import Guest from "./pages/guest/guest";
import Estadisticas from "./pages/estadisticas/estadisticas";

function RoutesManager() {
  return (
    <Routes>
      <Route path="/guest" element={<Guest />} />

      <Route element={<NotGuestRoute exceptRoutes={['/login', '/register']} />}>
        <Route path="/" element={<Home />} />
        <Route path="/create-video" element={<VideoSubmissionForm />} />
        <Route path="/mis-videos" element={<MisVideos />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default RoutesManager;
