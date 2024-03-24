import React, { useState } from 'react';
import { updateDogProfile } from '../dog/api'; // Import the updateDogProfile function

const EditDogProfileForm = ({ dogProfile, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: dogProfile._id, // Ensure the dog profile ID is properly retrieved
    name: dogProfile.name,
    breed: dogProfile.breed,
    age: dogProfile.age
  });

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
      // Make API call to update the dog profile
      await updateDogProfile(formData.id, formData); // Pass the dog profile ID and updated data
      onUpdate(); // Notify parent component that update is complete
    } catch (error) {
      console.error('Error updating dog profile:', error);
      // Handle error, e.g., show error message to the user
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Edit Dog Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Breed:</label>
          <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Age:</label>
          <input type="text" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update Dog Profile</button>
      </form>
    </div>
  );
};

export default EditDogProfileForm;
