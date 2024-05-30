import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";

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
          <Route
            path="/login"
            element={<h1 className="text-center">Login</h1>}
          />
          <Route
            path="/register"
            element={<h1 className="text-center">Register</h1>}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
