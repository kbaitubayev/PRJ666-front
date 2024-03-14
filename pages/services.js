// pages/services.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Services = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get('/services');
        setServicesData(response.data);
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div>
      <h1>Services</h1>
      <div className="row justify-content-center">
        {servicesData.map((service, index) => (
          <div key={index} className="col-md-4 offset-md-0 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{`Price:  $${service.price}`}</p>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
