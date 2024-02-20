import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Contacts = () => {
  const [contactsData, setContactsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/contacts');
        setContactsData(response.data.contacts);
      } catch (error) {
        console.error('Error fetching contacts data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>{contactsData?.title} <br/></h2>
<br/>
      <div className="row">
        {/* Left tile for contact information */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              {/* Render your contact information here */}
              <h5 className="card-title">Contact Information:</h5>
              <p className="card-text" dangerouslySetInnerHTML={{ __html: contactsData?.contactInformation.replace(/\n/g, '<br/>') }}></p>
            </div>
          </div>
        </div>

        {/* Right tile for working hours */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              {/* Render your working hours here */}
              <h5 className="card-title">Working Hours:</h5>
              <p className="card-text" dangerouslySetInnerHTML={{ __html: contactsData?.workingHours.replace(/\n/g, '<br/>') }}></p>
            </div>
          </div>
        </div>
      </div>

      {/* Second row for map */}
      <div className="row">
  <div className="col-md-12">
    {/* Render your map here */}
    <div className="map-container">
      {/* Use a simple iframe to embed Google Maps */}
      <iframe
        title="Map"
        width="100%"
        height="400"
        frameBorder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d719.9842623464049!2d-79.3493421303519!3d43.79491926623198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDPCsDQ3JzQxLjciTiA3OcKwMjAnNTUuMyJX!5e0!3m2!1sen!2sca!4v1708390373652!5m2!1sen!2sca"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</div>

    </div>
  );
};

export default Contacts;
