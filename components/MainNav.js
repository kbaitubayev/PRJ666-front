import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function MainNav() {
  const router = useRouter();
  

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary fixed-top"
        data-bs-theme="dark"
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
                  style={{fontWeight: "bold", letterSpacing: "2px"}}
                >
                  BOOK NOW
                </Button>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link>Login</Nav.Link>
              </Link>
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
                <Nav.Link style={{ marginRight: "10px", fontWeight:"bold"}} active={router.pathname === "/"} >
                  Home
                </Nav.Link> 
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <Nav.Link style={{ marginRight: "10px", fontWeight:"bold"}} active={router.pathname === "/about"}>
                  About Us
                </Nav.Link>
              </Link>
              <Link href="/services" passHref legacyBehavior>
                <Nav.Link style={{ marginRight: "10px", fontWeight:"bold"}} active={router.pathname === "/services"}>
                  Services
                </Nav.Link>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <Nav.Link href="/contact" style={{ marginRight: "10px" , fontWeight:"bold"}} active={router.pathname === "/contact"}>
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
