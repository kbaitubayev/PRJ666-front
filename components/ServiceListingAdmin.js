import React, { useState } from 'react';
import EditServiceForm from './EditServiceForm'; // Import the EditServiceForm component
import { deleteService } from '../services/api'; // Import the deleteService function

const ServiceListingAdmin = ({ services, fetchServices }) => {
  const [editingServiceId, setEditingServiceId] = useState(null);

  const handleEditClick = (serviceId) => {
    setEditingServiceId(serviceId);
  };

  const handleCancelEdit = () => {
    setEditingServiceId(null);
  };

  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId);
      // After successful deletion, fetch updated list of services
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div>
      <h2>Existing Services</h2>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            <div>
              <strong>Title:</strong> {service.title}
            </div>
            <div>
              <strong>Price:</strong> {service.price}
            </div>
            <div>
              <strong>Description:</strong> {service.description}
            </div>
            <div>
              <button onClick={() => handleDelete(service._id)}>Delete</button>
              {!editingServiceId && (
                <button onClick={() => handleEditClick(service._id)}>Edit</button>
              )}
            </div>
            {editingServiceId === service._id && (
              <EditServiceForm
                service={service}
                onUpdate={() => {
                  handleCancelEdit();
                  fetchServices(); // Fetch services after successful update
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceListingAdmin;
