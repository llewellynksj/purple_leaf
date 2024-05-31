import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import "./services/axiosDefaults";
import RegisterForm from "./pages/auth/RegisterForm";
import LoginForm from "./pages/auth/LoginForm";

// Bootstrap
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<h1 className="text-center">Home</h1>} />
          <Route
            path="/about"
            element={<h1 className="text-center">About</h1>}
          />
          <Route
            path="/support"
            element={<h1 className="text-center">Support</h1>}
          />
          <Route
            path="/contact"
            element={<h1 className="text-center">Contact</h1>}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
