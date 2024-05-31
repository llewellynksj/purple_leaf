import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

// Bootstrap
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";

const LoginForm = () => {
  useRedirect("loggedIn");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/login/", loginData);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Container className="height">
      <Row>
        <Col className="mt-2 py-2">
          <h1>Login</h1>
        </Col>
      </Row>
      {/* Login Form */}
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                autoComplete="on"
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                autoComplete="on"
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button type="submit">Submit</Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
          <Container className="mt-4">
            <Link
              to="/register"
              style={{ textDecoration: "none" }}
              className="lead"
            >
              Don't have an account yet? Register
            </Link>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
