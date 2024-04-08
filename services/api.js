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

// Function to delete a service by ID
export const deleteService = async (serviceId) => {
  try {
    await api.delete(`/services/${serviceId}`);
  } catch (error) {
    throw error;
  }
};

// Function to update a service by ID
export const updateService = async (serviceId, updatedServiceData) => {
  try {
    const response = await api.put(`/services/${serviceId}`, updatedServiceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch details of a service by ID
export const getService = async (serviceId) => {
  try {
    const response = await api.get(`/services/${serviceId}`);
    return response.data; // Return the service object
  } catch (error) {
    throw error; // Throw any errors that occur during the API call
  }
};

export default api;
