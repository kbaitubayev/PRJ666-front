// components/ServiceListing.js

import React from 'react';

const ServiceListing = ({ services, onDelete }) => {
  return (
    <div>
      <h2>Existing Services</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <div>
              <strong>Title:</strong> {service.title}
            </div>
            <div>
              <strong>Price:</strong> {service.price}
            </div>
            <div>
              <strong>Description:</strong> {service.description}
            </div>
            <div>
              <button onClick={() => onDelete(service.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceListing;
