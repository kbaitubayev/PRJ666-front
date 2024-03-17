// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Function to create a new service
export const createService = async (newServiceData) => {
  try {
    const response = await api.post('/services', newServiceData);
    return response.data; // Return the created service object
  } catch (error) {
    throw error; // Throw any errors that occur during the API call
  }
};

export default api;
