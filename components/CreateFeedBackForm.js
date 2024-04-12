import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; // Import star icons from React Icons
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'; // Import the toast library
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const CreateFeedbackForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    rating: 0, // Initialize rating as 0
    comment: '',
    service: '', // Initialize service as empty string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'rating' ? parseFloat(value) : value // Parse rating as float
    }));
  };

  const handleStarClick = (index) => {
    // Set rating to the index + 1 of the clicked star
    setFormData(prevState => ({
      ...prevState,
      rating: index + 1
    }));
  };

  const handleStarHover = (index) => {
    // Do nothing on hover
  };

  const handleStarLeave = () => {
    // Do nothing on mouse leave
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      // If no rating is given, display an error toast
      toast.error('Please give a star rating');
    } else {
      // If a rating is given, proceed with feedback submission
      await onCreate(formData);
      // Show feedback submission confirmation toast
      toast.success('Feedback submitted successfully', {
        autoClose: 3000, // Auto close the toast after 3 seconds
        position: "bottom-center" // Display toast at the bottom-center
      });
      // Redirect to home page after successful submission
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>How do you feel about our services?</h2>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        {[...Array(5)].map((_, index) => (
          formData.rating > index ? // Render filled star if rating is greater than index
            <AiFillStar key={index} onClick={() => handleStarClick(index)} onMouseEnter={() => handleStarHover(index)} onMouseLeave={() => handleStarLeave()} style={{ fontSize: '24px', color: '#ffc107', cursor: 'pointer' }} />
            :
            <AiOutlineStar key={index} onClick={() => handleStarClick(index)} onMouseEnter={() => handleStarHover(index)} onMouseLeave={() => handleStarLeave()} style={{ fontSize: '24px', color: '#ccc', cursor: 'pointer' }} />
        ))}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Comment:</label>
        <textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="If you're not satisfied, how can we improve our services?" style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc', resize: 'vertical' }} required />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Service:</label>
        <select name="service" value={formData.service} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} required>
          <option value="">Select a service</option>
          <option value="Small Dog Full Groom">Small Dog Full Groom</option>
          <option value="Medium Dog Full Groom">Medium Dog Full Groom</option>
          <option value="Large Dog Full Groom">Large Dog Full Groom</option>
          <option value="Small Dog Bath & Tidy">Small Dog Bath & Tidy</option>
          <option value="Medium Dog Bath & Tidy">Medium Dog Bath & Tidy</option>
          <option value="Large Dog Bath & Tidy">Large Dog Bath & Tidy</option>
          <option value="Bath & Dry Small Dog">Bath & Dry Small Dog</option>
          <option value="Bath & Dry Medium Dog">Bath & Dry Medium Dog</option>
          <option value="Bath & Dry Large Dog">Bath & Dry Large Dog</option>
        </select>
      </div>
      <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '3px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Submit Feedback</button>
    </form>
  );
};

export default CreateFeedbackForm;
