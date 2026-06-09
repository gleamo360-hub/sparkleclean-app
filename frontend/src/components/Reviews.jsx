import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  
  const token = localStorage.getItem('token'); 

  // 1. Fetch the reviews when the page loads (Built directly inside to make React happy!)
  useEffect(() => {
    const loadInitialReviews = async () => {
      try {
        const response = await axios.get('https://sparkleclean-backend.onrender.com/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.log("Error loading reviews:", error);
      }
    };
    
    loadInitialReviews();
  }, []); // <-- Empty array is now perfectly safe and error-free!

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      // 2. Submit the new review to the database
      await axios.post('https://sparkleclean-backend.onrender.com/api/reviews', 
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessage('Thank you for your review!');
      setComment(''); // Clear the text box
      
      // 3. Manually ask the database for the updated list right here!
      const updatedResponse = await axios.get('https://sparkleclean-backend.onrender.com/api/reviews');
      setReviews(updatedResponse.data);
      
    } catch (error) {
      console.log("Error submitting review:", error);
      setMessage('Failed to submit review.');
    }
  };

  return (
    <section className="reviews-section">
      <h2>What Our Customers Say</h2>
      
      <div className="reviews-grid">
        {reviews.length === 0 ? <p>No reviews yet. Be the first!</p> : 
          reviews.map(review => (
            <div key={review._id} className="review-card">
              <h4>{review.customerId?.name || 'Anonymous User'}</h4>
              <p className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
              <p className="comment">"{review.comment}"</p>
            </div>
          ))
        }
      </div>

      {token ? (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Leave a Review</h3>
          {message && <p className="success-msg">{message}</p>}
          <div className="form-group">
            <label>Rating (1-5 Stars)</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
          </div>
          <div className="form-group">
            <label>Comment</label>
            <textarea 
              rows="3" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              required 
              placeholder="Tell us about your experience..."
            />
          </div>
          <button type="submit" className="btn-submit">Submit Review</button>
        </form>
      ) : (
        <p className="login-prompt"><em>Log in to leave a review!</em></p>
      )}
    </section>
  );
};

export default Reviews;