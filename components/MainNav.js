//MainNav.js
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
  const [customer, setCustomer] = useState({
    user: {
      email: '',
      password: ''
    }
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This code will only run on the client-side
    setToken(getToken());
    // Fetch user data from local storage
    setUser(JSON.parse(localStorage.getItem('userLoggedIn')));
  }, []);

  useEffect(() => {
    // Fetch customer profile data from the server
    const fetchCustomerProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/customers/profile', {
          headers: {
            'x-auth-token': token
          },
          body: JSON.stringify(user)
        });
        // Update customer state with fetched data
        setCustomer(response.data);
        localStorage.setItem('userName', response.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    // Fetch customer profile when user state changes
    if (user) {
      fetchCustomerProfile();
    }
  }, [user]);

  function logout() {
    removeToken();
    window.location.href = '/';
  }

    // Function to check if the user is an admin
    const isAdmin = () => {
      return user.email === 'admin@seneca.ca';
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
                  <NavDropdown title={user.email} id="basic-nav-dropdown">
                    <Link href="/profile" passHref legacyBehavior><Nav.Link><NavDropdown.Item active={router.pathname === "/profile"} onClick={() => setIsExpanded(false)} href="#action/3.1">Profile</NavDropdown.Item></Nav.Link></Link>
                    <Link href="/dogprofile" passHref legacyBehavior><Nav.Link><NavDropdown.Item active={router.pathname === "/dogprofile"} onClick={() => setIsExpanded(false)} href="#action/3.1">Dog Profile</NavDropdown.Item></Nav.Link></Link>
                    <Link href="/password" passHref legacyBehavior><Nav.Link><NavDropdown.Item active={router.pathname === "/password"} onClick={() => setIsExpanded(false)} href="#action/3.1">Change Password</NavDropdown.Item></Nav.Link></Link>
                    <Link href="/appointment" passHref legacyBehavior><Nav.Link><NavDropdown.Item active={router.pathname === "/appointment"} onClick={() => setIsExpanded(false)} href="#action/3.1">Appointment</NavDropdown.Item></Nav.Link></Link>

                    {isAdmin() && <Link href="/service-management" passHref legacyBehavior><Nav.Link><NavDropdown.Item active={router.pathname === "/service-management"} onClick={() => setIsExpanded(false)} href="#action/3.1">Service Management</NavDropdown.Item></Nav.Link></Link>}
                    
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
              <Link href="/feedback" passHref legacyBehavior>
                <Nav.Link href="/feedback" style={{ marginRight: "10px", fontWeight: "bold" }} active={router.pathname === "/feedback"}>
                  Feedback
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}