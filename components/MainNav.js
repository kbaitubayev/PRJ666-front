import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

export default function MainNav() {
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
                <Nav.Link
                  className="btn btn-primary"
                  style={{ backgroundColor: "blue", fontWeight: "bold" }}
                >
                  BOOKING
                </Nav.Link>
              </Link>
              <Link href="/auth/login" passHref legacyBehavior>
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
              <Nav.Link href="/" style={{ marginRight: "10px" }}>
                Home
              </Nav.Link>
              <Nav.Link href="/about" style={{ marginRight: "10px" }}>
                About Us
              </Nav.Link>
              <Nav.Link href="/services" style={{ marginRight: "10px" }}>
                Services
              </Nav.Link>
              <Nav.Link href="/contact" style={{ marginRight: "10px" }}>
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
