// components/ServiceListing.js
import React from 'react';
import styles from '../styles/ServiceListing.module.css'; // Import the CSS module

const ServiceListing = ({ services }) => {
  return (
    <div>
      <h1>Services</h1>
      <div className="service-listing">
        {services.map(service => (
          <div key={service._id} className="service-card">
            <h2>{service.title}</h2>
            <p>Price: ${service.price}</p>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListing;