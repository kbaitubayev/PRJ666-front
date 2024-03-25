import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CreateFeedbackForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreate(formData);
    // Redirect to home page after successful submission
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>How do you feel about us?</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Rating:</label>
        <select name="rating" value={formData.rating} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} required>
          <option value="">Select Rating</option>
          {[1, 2, 3, 4, 5].map(star => (
            <option key={star} value={star}>{star} stars</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Comment:</label>
        <textarea name="comment" value={formData.comment} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc', resize: 'vertical' }} required />
      </div>
      
      <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '3px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Submit Feedback</button>
    </form>
  );
};

export default CreateFeedbackForm;
