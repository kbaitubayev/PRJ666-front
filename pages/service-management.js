import React, { useState, useEffect } from 'react';
import ServiceListing from '../components/ServiceListing';
import CreateServiceForm from '../components/CreateServiceForm'; // Import the CreateServiceForm component
import { fetchServices, deleteService } from './services'; // Import your API functions
import { createService } from '../services/api'; // Adjust the path as needed
import api from '../services/api';


const ServiceManagementPage = () => {
  const [services, setServices] = useState([]);

 // Fetch existing services from the backend when the page loads
 useEffect(() => {
  const getServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  getServices();
}, []);


  // Function to handle service deletion
  const handleDeleteService = async (serviceId) => {
    try {
      await deleteService(serviceId);
      // Update services list after deletion
      const updatedServices = services.filter(service => service.id !== serviceId);
      setServices(updatedServices);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

// Function to handle creation of a new service
const handleCreateService = async (formData) => {
    try {
      // Perform API call to create a new service
      const newService = await createService(formData);
      // Update services list after creation
      setServices([...services, newService]);
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div>
      <h1>Service Management</h1>
      {/* Render the CreateServiceForm component */}
      <CreateServiceForm onCreate={handleCreateService} />
      <ServiceListing
        services={services}
        onDelete={handleDeleteService}
      />
    </div>
  );
};

export default ServiceManagementPage;
