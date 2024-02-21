import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken, removeToken, getUsername } from '../lib/token';
import { NavDropdown } from "react-bootstrap";
import { get } from "react-hook-form";

export default function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // This code will only run on the client-side
    setToken(getToken());
  }, []);

  function logout() {
    removeToken();
    window.location.href = '/';
  }


  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary fixed-top"
        data-bs-theme="dark"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>DOG GROOMING</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link href="/booking" passHref legacyBehavior>
                <Button
                  type="button"
                  className="btn btn-danger"
                  style={{ fontWeight: "bold", letterSpacing: "2px" }}
                >
                  BOOK NOW
                </Button>
              </Link>
              {!token &&
                <Link href="/auth/login" passHref legacyBehavior>
                  <Nav.Link>Login</Nav.Link>
                </Link>
              }

              {token &&
                <Nav>
                  <NavDropdown title={"Wellcome"} id="basic-nav-dropdown">
                    <Link href="/profile" passHref legacyBehavior><Nav.Link><NavDropdown.Item active={router.pathname === "/profile"} onClick={() => setIsExpanded(false)} href="#action/3.1">Profile</NavDropdown.Item></Nav.Link></Link>
                    <Link href="/password" passHref legacyBehavior><Nav.Link><NavDropdown.Item active={router.pathname === "/password"} onClick={() => setIsExpanded(false)} href="#action/3.1">Change Password</NavDropdown.Item></Nav.Link></Link>
                    <NavDropdown.Item onClick={() => { setIsExpanded(false); logout(); }}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="light">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link style={{ marginRight: "10px", fontWeight: "bold" }} active={router.pathname === "/"} >
                  Home
                </Nav.Link>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <Nav.Link style={{ marginRight: "10px", fontWeight: "bold" }} active={router.pathname === "/about"}>
                  About Us
                </Nav.Link>
              </Link>
              <Link href="/services" passHref legacyBehavior>
                <Nav.Link style={{ marginRight: "10px", fontWeight: "bold" }} active={router.pathname === "/services"}>
                  Services
                </Nav.Link>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <Nav.Link href="/contact" style={{ marginRight: "10px", fontWeight: "bold" }} active={router.pathname === "/contact"}>
                  Contact
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
