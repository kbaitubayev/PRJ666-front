import React from 'react';
import { deleteFeedback } from '../feedback/api'; // Import the deleteFeedback function

const FeedbackListing = ({ feedbacks, fetchFeedbacks }) => {
  const handleDelete = async (feedbackId) => {
    try {
      await deleteFeedback(feedbackId);
      // After successful deletion, fetch updated list of feedback entries
      fetchFeedbacks();
    } catch (error) {
      console.error('Error deleting feedback entry:', error);
    }
  };
  
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Existing Feedback Entries</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {feedbacks.map(feedback => (
          <li key={feedback._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>Rating:</strong> {feedback.rating}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Comment:</strong> {feedback.comment}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Service:</strong> {feedback.service}
            </div>
            <div>
              <button onClick={() => handleDelete(feedback._id)} style={{ backgroundColor: '#f44336', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackListing;
