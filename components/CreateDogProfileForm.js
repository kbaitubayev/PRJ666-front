import React, { useState } from 'react';
import { createDogProfile } from '../dog/api'; // Import the createDogProfile function

const CreateDogProfileForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    // Add more fields as needed for dog profile creation
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data here if needed
    onCreate(formData);
    // Clear form fields after submission
    setFormData({
      name: '',
      breed: '',
      age: '',
      // Clear more fields as needed
    });
  };

  return (
    <div>
      <h2>Create New Dog Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Breed:</label>
          <input type="text" name="breed" value={formData.breed} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Age:</label>
          <input type="text" name="age" value={formData.age} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
        </div>
        
        {/* Add more fields as needed for dog profile creation */}
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Dog Profile</button>
      </form>
    </div>
  );
};

export default CreateDogProfileForm;
