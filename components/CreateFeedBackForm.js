import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; // Import star icons from React Icons
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'; // Import the toast library
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const CreateFeedbackForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    rating: 0, // Initialize rating as 0
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
    await onCreate(formData);
    // Show feedback submission confirmation toast
    toast.success('Feedback submitted successfully', {
      autoClose: 3000, // Auto close the toast after 3 seconds
      position: "bottom-center" // Display toast at the bottom-center
    });
    // Redirect to home page after successful submission
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>How do you feel about us?</h2>
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
        <textarea name="comment" value={formData.comment} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc', resize: 'vertical' }} required />
      </div>
      
      <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '3px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Submit Feedback</button>
    </form>
  );
};

export default CreateFeedbackForm;
