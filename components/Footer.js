import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from "../styles/Home.module.css";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#f8f9fa", padding: "20px 0" }}>
      <Container>
        <Row>
          <Col>
            <h5>Dog Grooming</h5>
            <p>Information about dog grooming...</p>
          </Col>
          <Col>
            <h5>Service</h5>
            <p>Information about services...</p>
          </Col>
          <Col>
            <h5>Business Hour</h5>
            <p>Information about business hours...</p>
          </Col>
          <Col>
            <h5>Contact</h5>
            <p>
              <span className={styles.icon}>
                <FaFacebook />
              </span>{" "}
              Facebook
              <br />
              <span className={styles.icon}>
                <FaInstagram />
              </span>{" "}
              Instagram
              <br />
              <span className={styles.icon}>
                <FaTwitter />
              </span>{" "}
              Twitter
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
