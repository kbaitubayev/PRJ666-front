import React from "react";
import { Container } from "react-bootstrap";
import MainNav from "./MainNav";
import Footer from "./Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <Container>{children}</Container>
      <Footer />
      <ToastContainer />
    </>
  );
}
