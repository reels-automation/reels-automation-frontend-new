import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/?logged=true");
      window.location.reload();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default OAuthCallback;
