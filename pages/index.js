import React from "react";
import styles from "../styles/Home.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import image1 from "../assests/image1.jpg";
import image2 from "../assests/image2.jpg";
import image3 from "../assests/image3.jpg";
import image4 from "../assests/image4.jpg";
import image5 from "../assests/image5.jpg";
import image6 from "../assests/image6.jpg";
import carousel from "../assests/carousel.jpg";
import Image from "next/image";

const images = [image1, image2, image3, image4, image5, image6];

const Home = () => {
  return (
    <div className={styles["services-section"]}>
      <div style={{ position: "relative", width: "100vw", height: "500px" }}>
        <Image
          src={carousel}
          objectFit="cover"
          layout="fill"
          alt="Description of image"
        />
      </div>
      <div>
        <h1 className={styles["section-title"]}>OUR SERVICES</h1>
      </div>
      <Row className={styles.row}>
        <Col sm={4}>
          <Card
            className={`${styles["service-card"]} ${styles["card-margin"]}`}
          >
            <Image
              src={image1}
              alt="Gallery image"
              objectFit="cover"
              layout="responsive"
            />
            <Card.Body>
              <Card.Title className={styles["card-title"]}>
                Service 1
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Container className="gallery-section">
        <h1 className={styles["section-title"]}>GALLERY</h1>
        <Row>
          {[...Array(3)].map((_, i) => (
            <Col sm={4} key={i}>
              <Card className={styles["service-card"]}>
                <Image
                  src={images[i]}
                  alt="Gallery image"
                  objectFit="cover"
                  layout="responsive"
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          {[...Array(3)].map((_, i) => (
            <Col sm={4} key={i + 3}>
              <Card className={styles["service-card"]}>
                <Image
                  src={images[i + 3]}
                  alt="Gallery image"
                  objectFit="cover"
                  layout="responsive"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
