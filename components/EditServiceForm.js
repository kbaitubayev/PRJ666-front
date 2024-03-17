// components/EditServiceForm.js
import React, { useState } from 'react';
import { updateService } from '../services/api'; // Import the updateService function

const EditServiceForm = ({ service, onUpdate }) => {

  console.log('Service object:', service);

  const [formData, setFormData] = useState({
    id: service._id, // Ensure the service ID is properly retrieved
    title: service.title,
    price: service.price,
    description: service.description
  });
    // Log the value of the service ID
    console.log('Service ID:', service._id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update the service
      await updateService(formData.id, formData); // Pass the service ID and updated data
      onUpdate(); // Notify parent component that update is complete
    } catch (error) {
      console.error('Error updating service:', error);
      // Handle error, e.g., show error message to the user
    }
  };
  

  return (
    <div>
      <h2>Edit Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit">Update Service</button>
      </form>
    </div>
  );
};

export default EditServiceForm;
