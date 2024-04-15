import React, { useState, useEffect } from 'react';
import { deleteFeedback } from '../feedback/api'; // Import the deleteFeedback function

const FeedbackListing = ({ feedbacks, fetchFeedbacks }) => {
  // State to store the average ratings for each service
  const [averageRatings, setAverageRatings] = useState({});
  // State to store comments for each service
  const [commentsByService, setCommentsByService] = useState({});

  // Function to group feedbacks by service and calculate average rating for each service
  const calculateAverageRatings = () => {
    const ratingsByService = {};
    const countsByService = {};
    const commentsByService = {};

    // Initialize ratings, counts, and comments for each service
    feedbacks.forEach(feedback => {
      if (!ratingsByService[feedback.service]) {
        ratingsByService[feedback.service] = feedback.rating;
        countsByService[feedback.service] = 1;
        commentsByService[feedback.service] = [{ id: feedback._id, comment: feedback.comment, rating: feedback.rating }];
      } else {
        ratingsByService[feedback.service] += feedback.rating;
        countsByService[feedback.service]++;
        commentsByService[feedback.service].push({ id: feedback._id, comment: feedback.comment, rating: feedback.rating });
      }
    });

    // Calculate average rating for each service
    const averageRatings = {};
    Object.keys(ratingsByService).forEach(service => {
      averageRatings[service] = ratingsByService[service] / countsByService[service];
    });

    return { averageRatings, commentsByService };
  };

  // Update average ratings and comments when feedbacks change
  useEffect(() => {
    const { averageRatings, commentsByService } = calculateAverageRatings();
    setAverageRatings(averageRatings);
    setCommentsByService(commentsByService);
  }, [feedbacks]);

  // Function to handle deletion of a feedback entry
  const handleDelete = async (feedbackId, service) => {
    try {
      await deleteFeedback(feedbackId);
      // After successful deletion, fetch updated list of feedback entries
      fetchFeedbacks();
      // Remove the deleted feedback entry from commentsByService
      setCommentsByService(prevState => ({
        ...prevState,
        [service]: prevState[service].filter(comment => comment.id !== feedbackId)
      }));
    } catch (error) {
      console.error('Error deleting feedback entry:', error);
    }
  };

  // Function to render rating based on numeric value
  const renderRating = (rating) => {
    return rating.toFixed(1); // Show rating with one decimal place
  };

  return (
    <div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {/* Render average ratings and comments for each service */}
        {Object.keys(averageRatings).map(service => (
          <li key={service} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>Service:</strong> {service}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Average Rating:</strong> {renderRating(averageRatings[service])}
            </div>
            <div>
              <strong>User Comments & Rating:</strong>
              <ul>
                {commentsByService[service] && commentsByService[service].map((comment, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    <span style={{ fontWeight: 'bold' }}>User Rating: </span>{renderRating(comment.rating)}
                    <br />
                    <span style={{ marginLeft: '20px', fontWeight: 'bold' }}>Comment: </span>{comment.comment}
                    <button onClick={() => handleDelete(comment.id, service)} style={{ marginLeft: '10px', fontWeight: 'bold', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackListing;
