import React from "react";
import { NavLink } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// CSS
import s from "../styles/NavBar.module.css";

const NavBar = () => {
  const getNavLinkClass = ({ isActive }, additionalClasses = "") =>
    isActive
      ? `${s.NavColor} ${s.Active} ${additionalClasses}`
      : `${s.NavColor} ${additionalClasses}`;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className={s.NavLink}>
          <Navbar.Brand href="#home">Purple Leaf</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              className={(navData) => getNavLinkClass(navData, s.NavLink)}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={(navData) => getNavLinkClass(navData, s.NavLink)}
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={(navData) => getNavLinkClass(navData, s.NavLink)}
              to="/support"
            >
              Support
            </NavLink>
            <NavLink
              className={(navData) => getNavLinkClass(navData, s.NavLink)}
              to="/contact"
            >
              Contact
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            <NavLink
              className={(navData) => getNavLinkClass(navData, s.NavLink)}
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className={(navData) => getNavLinkClass(navData, s.NavLink)}
              to="/register"
            >
              Register
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
