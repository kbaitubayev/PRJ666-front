import React, { useState, useEffect } from 'react';
import CreateFeedbackForm from '../components/CreateFeedBackForm'
import { createFeedback } from '../feedback/api';
import api from '../feedback/api';
import FeedbackListing from '../components/FeedbackListing';

const FeedbackPage = () => {
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

  // Function to handle creation of a new feedback entry
  const handleCreateFeedback = async (formData) => {
    try {
      // Perform API call to create a new feedback entry
      const newFeedback = await createFeedback(formData);
      // Refetch feedbacks after creation
      fetchFeedbacks();
    } catch (error) {
      console.error('Error posting feedback:', error);
    }
  };

  return (
    <div>
      {/* Render the CreateFeedbackForm component */}
      <CreateFeedbackForm onCreate={handleCreateFeedback} />
      {/* Render the FeedbackListing component */}
      <FeedbackListing feedbacks={feedbacks} fetchFeedbacks={fetchFeedbacks} />
    </div>
  );
};

export default FeedbackPage;
