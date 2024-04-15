// ExistingFeedbackPage.js
import React, { useState, useEffect } from 'react';
import FeedbackListing from '../components/FeedbackListing';
import api from '../feedback/api';

const ExistingFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Function to fetch feedbacks from the backend
  const fetchFeedbacks = async () => {
    try {
      const response = await api.get('/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  // Fetch existing feedbacks from the backend when the page loads
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Existing Feedback Entries</h2>
      <FeedbackListing feedbacks={feedbacks} fetchFeedbacks={fetchFeedbacks} />
    </div>
  );
};

export default ExistingFeedbackPage;
