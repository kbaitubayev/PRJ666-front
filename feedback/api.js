import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Function to create a new dog profile
export const createFeedback = async (newFeedbackData) => {
  try {
    const response = await api.post('/feedback', newFeedbackData);
    return response.data; // Return the created dog profile object
  } catch (error) {
    throw error; // Throw any errors that occur during the API call
  }
};


export default api;
