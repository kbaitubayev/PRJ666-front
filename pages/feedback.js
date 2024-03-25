import React, { useState, useEffect } from 'react';
import CreateFeedbackForm from '../components/CreateFeedBackForm'; // Import the CreateDogProfileForm component
import { createFeedback } from '../feedback/api'; // Adjust the path as needed
import api from '../feedback/api';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);

  // Function to fetch dog profiles from the backend
  const fetchFeedback = async () => {
    try {
      const response = await api.get('/feedback');
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  // Fetch existing dog profiles from the backend when the page loads
  useEffect(() => {
    fetchFeedback();
  }, []);

  // Function to handle dog profile deletion
  

  // Function to handle creation of a new dog profile
  const handleCreateFeedback = async (formData) => {
    try {
      // Perform API call to create a new dog profile
      const newFeedback= await createFeedback(formData);
      // Refetch dog profiles after creation
      fetchFeedback();
    } catch (error) {
      console.error('Error posting Feedback:', error);
    }
  };

  return (
    <div>
      {/* Render the CreateDogProfileForm component */}
      <CreateFeedbackForm onCreate={handleCreateFeedback} />
      {/* Pass fetchDogProfiles as a prop to DogProfileListingAdmin */}
    </div>
  );
};

export default FeedbackPage;
