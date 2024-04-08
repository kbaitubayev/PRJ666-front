// FeedbackListing.js
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
        commentsByService[feedback.service] = [feedback.comment];
      } else {
        ratingsByService[feedback.service] += feedback.rating;
        countsByService[feedback.service]++;
        commentsByService[feedback.service].push(feedback.comment);
      }
    });

    // Calculate average rating for each service
    const averageRatings = {};
    Object.keys(ratingsByService).forEach(service => {
      averageRatings[service] = (ratingsByService[service] / countsByService[service]).toFixed(2);
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
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {/* Render average ratings and comments for each service */}
        {Object.keys(averageRatings).map(service => (
          <li key={service} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>Service:</strong> {service}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Average Rating:</strong> {averageRatings[service]}
            </div>
            <div>
              <strong>User Comments:</strong>
              <ul>
                {commentsByService[service] && commentsByService[service].map((comment, index) => (
                  <li key={index}>{comment}</li>
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
