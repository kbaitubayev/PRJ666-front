//pages/appointment-management.js
import React, { useState, useEffect } from 'react';
import AppointmentListingAdmin from '../components/AppointmentListingAdmin';
//import CreateServiceForm from '../components/CreateServiceForm'; // Import the CreateServiceForm component
//import { deleteService } from './services'; // Import your API functions
//import { createService } from '../services/api'; // Adjust the path as needed
import api from '../services/api';

const AppointmentManagementPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState({}); // State for fetched services (by ID)


  // Function to fetch appointments from the backend
  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Fetch existing appointments from the backend when the page loads
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchService = async (serviceId) => {
    try {
      const response = await api.get(`/services/${serviceId}`); // Replace with your API endpoint
      setServices(prevServices => ({ ...prevServices, [serviceId]: response.data }));
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };


  /*// Function to handle service deletion
  const handleDeleteAppointment = async (serviceId) => {
    try {
      await deleteAppointment(serviceId);
      // Refetch services after deletion
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };*/

  /*// Function to handle creation of a new service
  const handleCreateAppointment = async (formData) => {
    try {
      // Perform API call to create a new service
      const newAppointment = await createAppointment(formData);
      // Refetch services after creation
      fetchAppointments();
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };*/

  return (
    <div>
      <h1>Appointment Management</h1>
    
      {/* Pass fetchAppointments as a prop to AppointmentListingAdmin */}
      <AppointmentListingAdmin
  appointments={appointments}
  fetchAppointments={fetchAppointments}
  fetchService={fetchService}
  services={services}
/>
    </div>
  );
};

export default AppointmentManagementPage;
