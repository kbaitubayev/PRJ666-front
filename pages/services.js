// pages/services.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Services = () => {
  const [servicesData, setServicesData] = useState(null);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get('/services');
        setServicesData(response.data.services);
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{servicesData?.title}</h1>
      <p>{servicesData?.description}</p>

      <div className="row justify-content-center">
        {servicesData?.servicesList.map((service, index) => (
          <div key={index} className="col-md-4 offset-md-0 mb-4">
            {/* Adjust the column size based on your preference */}
            <div className="card">
              <div className="row g-0">
                {/* First row, left column (contains picture) */}
                <div className="col-md-3">
                <img
    src={service.imageUrl}
    alt={`${service.title} Image`}
    style={{ maxWidth: "100px" }} // Set the desired maximum width
    className="card-img-top"
  />
                </div>
                {/* First row, right column (contains card title) */}
                <div className="col-md-9 d-flex align-items-center">
  <div className="card-body">
    <h5 className="card-title">{service.title}</h5>
  </div>
</div>
              </div>
              {/* Second row (contains text with description) */}
              <div className="row">
  <div className="col-md-12">
    <div className="card-body">
      <p className="card-text" dangerouslySetInnerHTML={{ __html: service.text.replace(/\n/g, '<br/>') }}></p>
    </div>
  </div>
</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
