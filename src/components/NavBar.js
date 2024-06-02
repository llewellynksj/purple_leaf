import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import logo from "../assets/pl_logo.png";

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

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const [isMobile, setIsMobile] = useState(false);

  //Check if the user is on mobile screen size
  useEffect(() => {
    // Check the screen width to determine the size is less than lg to match burger menu toggle
    const isMobileDevice = window.innerWidth <= 992;
    setIsMobile(isMobileDevice);

    // Update the state if the screen width changes
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  // Logged In NavBar
  const loggedInNav = (
    <>
      <NavLink to="/">
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className={s.NavToggle}
        ref={ref}
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`me-auto`}>
          <NavLink
            exact
            to="/"
            className={(navData) => getNavLinkClass(navData, s.NavLink)}
            activeClassName={s.Active}
          >
            Home
          </NavLink>
        </Nav>
        <Nav className={`ml-auto`}>
          <NavLink
            to="/"
            className={(navData) => getNavLinkClass(navData, s.NavLink)}
            onClick={handleLogout}
          >
            Logout
          </NavLink>
          <NavLink
            to={`/profiles/${currentUser?.profile_id}`}
            className={(navData) => getNavLinkClass(navData, s.NavLink)}
            activeClassName={s.Active}
          >
            {isMobile ? (
              <p mobile="true">{currentUser?.username}'s Account</p>
            ) : (
              <Avatar
                src={currentUser?.profile_image}
                text={currentUser?.username}
                height={32}
              />
            )}
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </>
  );

  // Logged Out NavBar
  const loggedOutNav = (
    <>
      <NavLink to="/">
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className={s.NavToggle}
        ref={ref}
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`me-auto`}>
          <NavLink
            exact
            to="/"
            className={(navData) => getNavLinkClass(navData, s.NavLink)}
            activeClassName={s.Active}
          >
            Home
          </NavLink>
        </Nav>
        <Nav className={`ml-auto`}>
          <NavLink
            to="/login"
            className={(navData) => getNavLinkClass(navData, s.NavLink)}
            activeClassName={s.Active}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={(navData) => getNavLinkClass(navData, s.NavLink)}
            activeClassName={s.Active}
          >
            Register
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </>
  );

  return (
    <Navbar expanded={expanded} expand="lg" className="mb-3">
      <Container>{currentUser ? loggedInNav : loggedOutNav}</Container>
    </Navbar>
    // <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="#home">Purple Leaf</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <NavLink
    //           className={(navData) => getNavLinkClass(navData, s.NavLink)}
    //           to="/"
    //         >
    //           Home
    //         </NavLink>
    //         <NavLink
    //           className={(navData) => getNavLinkClass(navData, s.NavLink)}
    //           to="/about"
    //         >
    //           About
    //         </NavLink>
    //         <NavLink
    //           className={(navData) => getNavLinkClass(navData, s.NavLink)}
    //           to="/support"
    //         >
    //           Support
    //         </NavLink>
    //         <NavLink
    //           className={(navData) => getNavLinkClass(navData, s.NavLink)}
    //           to="/contact"
    //         >
    //           Contact
    //         </NavLink>
    //       </Nav>
    //       <Nav className="ml-auto">
    //         {currentUser ? loggedInNav : loggedOutNav}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default NavBar;
