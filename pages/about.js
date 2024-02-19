// pages/about.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get('/about');
        setAboutData(response.data.about);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
  <h1>{aboutData?.title}</h1>
  <p>{aboutData?.description}</p>

  <div className="row">
    {aboutData?.tiles.map((tile, index) => (
      <div key={index} className="col-md-4 mb-4">
        {/* Adjust the column size based on your preference */}
        <div className="card">
          <img src={tile.imageUrl} className="card-img-top" alt={`${tile.title} Image`} />
          <div className="card-body">
            <h6 className="card-title">{tile.title}</h6>
            {tile.text && typeof tile.text === 'string' && (
              <p key={index} className="card-text font-weight-bold">{tile.text}</p>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default About;
