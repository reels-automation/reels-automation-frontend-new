import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Use PrivateRoute for protected routes */}
          <Route
            path="/protected"
            element={<PrivateRoute element={() => <h1>Protected Page</h1>} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
