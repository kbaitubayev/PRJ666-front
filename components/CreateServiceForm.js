// components/CreateServiceForm.js

import React, { useState } from 'react';

const CreateServiceForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: ''
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
      title: '',
      price: '',
      description: ''
    });
  };

  return (
    <div>
      <h2>Create New Service</h2>
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
        <button type="submit">Create Service</button>
      </form>
    </div>
  );
};

export default CreateServiceForm;
