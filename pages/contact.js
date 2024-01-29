import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" />
      </Head>
      <Container>
        <h1 style={{ fontFamily: 'Permanent Marker, cursive', fontWeight: 'bold', fontSize: '4em', textAlign: "center", margin: "20px 0" }}>
          LOOKING FOR PROFESSIONAL ?
        </h1>
        <Row>
          <Col md={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.883362671181!2d-79.35117208960104!3d43.79603324306249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d31babbf5ce7%3A0x5812aa25d9fb9912!2sSeneca%20Polytechnic%20Newnham%20Campus!5e0!3m2!1svi!2sca!4v1706493636989!5m2!1svi!2sca"
              width="100%"
              height="350"
              style={{ border: 2, borderRadius: 10, marginBottom: 20, borderStyle:"solid"}}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Col>
          <Col md={6}>
          <h2>Business Hours</h2>
          <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
          <h2>Phone</h2>
          <p>(123) 456-7890</p>
          <h2>Email</h2>
          <p>info@dog-grooming.com</p>
        </Col>
        </Row>
      </Container>
    </>
  );
}