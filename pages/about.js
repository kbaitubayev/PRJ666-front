// pages/about.js

import React, { useState, useEffect } from 'react';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/about');
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Page about us !</h2>
      {aboutData ? (
        <div>
          {/* Render your about page content using aboutData */}
          <p>{aboutData.about}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AboutPage;
