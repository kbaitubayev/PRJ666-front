// pages/index.js

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '../services/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import styles from '../styles/Home.module.css'; // Import the CSS module
import { useAtom } from 'jotai';
import { customerAtom } from '../store';

const replaceNewlinesWithBr = (text) => {
  return { __html: text.replace(/\n/g, '<br/>') };
};

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [user, setUser] = useState('');
  const [customer, setCustomer] = useAtom(customerAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/');
        setHomeData(response.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    setUser(JSON.parse(localStorage.getItem('userLoggedIn')));

    fetchData();
  }, []);

  // Fetch customer profile data from the server
  useEffect(() => {
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
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch customer profile when user state changes
    if (user) {
      fetchCustomerProfile();
    }
  }, [user]);

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

      {/* Services cards */}
      <Row className="mt-4">
        {homeData && homeData.servicePics ? (
          homeData.servicePics.map((service, index) => (
            <Col key={index}>
              <Link href="/services" passHref>
                <Card as="a" style={{ height: '100%' }}>
                  <Card.Img variant="top" src={service.imageUrl} alt={`${service.title} Image`} />
                  <Card.Body>
                    <Card.Title
                      className="text-center"
                      dangerouslySetInnerHTML={replaceNewlinesWithBr(service.title)}
                    />
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <Col>
            <p>Loading services...</p>
          </Col>
        )}
      </Row>

      {/* Our Gallery title */}
      <Row className="mt-4">
        <Col>
          <h2 className="text-center">OUR GALLERY</h2>
        </Col>
      </Row>

      {/* Gallery section */}
      <Row className="mt-4">
        {homeData && homeData.galleryPics ? (
          homeData.galleryPics.map((galleryItem, index) => (
            <Col key={index} sm={6} md={4}>
              <Card style={{ height: '100%' }}>
                <Card.Img variant="top" src={galleryItem.imageUrl} alt={`${galleryItem.title} Image`} />
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>Loading gallery...</p>
          </Col>
        )}
      </Row>

      {/* Other sections */}
      {/* Add additional sections, components, or content as needed */}
    </Container>
  );
};

export default Home;
