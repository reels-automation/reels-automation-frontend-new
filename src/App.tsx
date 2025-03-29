
import RoutesManager from "./routes";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <RoutesManager />
    </AuthProvider>
  );
}

export default App;