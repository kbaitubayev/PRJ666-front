import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import image1 from "../assests/image1.jpg";

export default function Services() {
  return (
    <div>
      <Row className={`${styles["row-style"]}`}>
        <Col>
          <Image
            src={image1}
            alt="Gallery image"
            className={`${styles["service-image"]}`}
          />
        </Col>
        <Col className={`${styles["service-description"]}`}>
          <h2>Deluxe Bath Package</h2>
          <ul>
            <li>Shampoo</li>
            <li>Conditioner</li>
            <li>Blow Dry</li>
            <li>Brush</li>
            <li>Ear Cleaning</li>
            <li>Nail Trim</li>
          </ul>
        </Col>
      </Row>

      <Row className={`${styles["row-style"]}`}>
        <Col>
          <Image
            src={image1}
            alt="Gallery image"
            className={`${styles["service-image"]}`}
          />
        </Col>
        <Col className={`${styles["service-description"]}`}>
          <h2>Full Package</h2>
          <ul>
            <li>Shampoo</li>
            <li>Conditioner</li>
            <li>Blow Dry</li>
            <li>Brush</li>
            <li>Ear Cleaning</li>
            <li>Nail Trim</li>
            <li>Hair clipping</li>
          </ul>
        </Col>
      </Row>

      <Row className={`${styles["row-style"]}`}>
        <Col>
          <Image
            src={image1}
            alt="Gallery image"
            className={`${styles["service-image"]}`}
          />
        </Col>
        <Col className={`${styles["service-description"]}`}>
          <h2>Shedless Treatment</h2>
          <ul>
            <li>Full Package with the Shedless Treatment</li>
            <li>Bath with de-shedding solution</li>
            <li>Deep brushing to extract loose dead hair</li>

          </ul>
        </Col>
      </Row>
    </div>
  );
}
