// pages/index.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/Home.module.css'; // Import the CSS module

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/');
        setHomeData(response.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      {/* Discount banner */}
      <Row>
      <Col className={`text-center ${styles.discountBanner}`} style={{ backgroundImage: `url('/carousel.jpg')` }}>
    <div className="discount-banner">
      {homeData ? (
        <>
          <h1 className={styles.title}>{homeData.title}</h1>
              <p className={styles.message}>{homeData.message}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </Col>
</Row>

      {/* Other sections */}
      {/* Add additional sections, components, or content as needed */}
    </Container>
  );
};

export default Home;
