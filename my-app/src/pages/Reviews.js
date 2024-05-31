import React, { useEffect, useState } from 'react';
import { getItem, getReviews, addReview, updateReview, deleteReview } from '../data/repository'; // Assume these functions are defined in your repository
import { useParams } from 'react-router-dom';
import '../Reviews.css';

const imageMap = {
  "fishmax.jpg": require('../images/fishmaxImage.jpg'),
  "fishplus.jpg": require('../images/fishplusImage.jpg'),
  "fishemulsion.jpg": require('../images/fishemulsion.jpg'),
  "folup.jpg": require('../images/folupImage.jpg'),
  "fulvic.jpg": require('../images/fulvicImg.jpg'),
  "soil.jpg": require('../images/soilImg.jpg'),
  "Soil-Activator.jpg": require('../images/Soil-Activator.jpg'),
  "Humus-100.jpg": require('../images/Humus-100.jpg')
};

const Reviews = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [editReviewText, setEditReviewText] = useState('');
  const [editReviewRating, setEditReviewRating] = useState(1);

  const currentUser = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    async function loadProductDetails() {
      try {
        const productDetails = await getItem(id);
        setProduct(productDetails);
        const productReviews = await getReviews(productDetails.objectID);
        setReviews(productReviews);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading product details or reviews:", error);
        setIsLoading(false);
      }
    }
  
    loadProductDetails();
  }, [id]);

  const handleAddReview = async () => {
    const wordCount = newReview.trim().split(/\s+/).length;
    if (wordCount > 100) {
      setError('Review cannot be longer than 100 words.');
      return;
    }
    
    if (newReview.trim() && newRating > 0) {
      const review = {
        author: currentUser,
        body: newReview,
        rating: newRating,
        productID: product.objectID
      };
      await addReview(review);
      const updatedReviews = await getReviews(product.objectID);
      setReviews(updatedReviews);
      setNewReview('');
      setNewRating(1);
      setError('');
    } else {
      setError('Review cannot be empty');
    }
  };

  const handleEditReview = async (reviewId) => {
    if (editReviewText.trim() && editReviewRating > 0) {
      const updatedReview = {
        id: reviewId,
        author: currentUser,
        body: editReviewText,
        rating: editReviewRating,
        productID: product.objectID
      };
      await updateReview(updatedReview);
      const updatedReviews = await getReviews(product.objectID);
      setReviews(updatedReviews);
      setEditingReview(null);
    } else {
      setError('Review cannot be empty');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const confirmation = window.confirm( // display confirmation message to confirm if user wants to delete their profile
      "Are you sure you want to delete your review?"
    );

    if (confirmation) {
    await deleteReview(reviewId);
    const updatedReviews = await getReviews(product.objectID);
    setReviews(updatedReviews);
    alert("Your review has been deleted");
    }
  };

  const handleRatingChange = (rating) => {
    setNewRating(rating);
  };

  const handleEditRatingChange = (rating) => {
    setEditReviewRating(rating);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details and reviews...</p>
      </div>
    );
  }

  return (
    <div className="containerR">
      {product && (
        <div className="product-details">
          <div className="product-header">
            <img src={imageMap[product.image]} alt={product.title} className="product-image" />
            <span className="priceTag">${(product.price / 100).toFixed(2)}</span>
          </div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
        </div>
      )}
      <div className="reviews-section">
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="review">
              {editingReview === review.id ? (
                <div>
                  <textarea
                    value={editReviewText}
                    onChange={(e) => setEditReviewText(e.target.value)}
                    placeholder="Edit your review here..."
                  />
                  <div className="rating-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${editReviewRating >= star ? 'selected' : ''}`}
                        onClick={() => handleEditRatingChange(star)}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <div className="review-buttons">
                  <button onClick={() => handleEditReview(review.id)}>Save</button>
                  <button onClick={() => setEditingReview(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="review-header">
                    <span className="review-author">{review.author}</span>
                    <span className="review-rating">{review.rating} stars</span>
                  </div>
                  <p>{review.body}</p>
                  {review.author === currentUser && (
                    <div className="review-buttons">
                      <button onClick={() => { 
                        setEditingReview(review.id);
                        setEditReviewText(review.body);
                        setEditReviewRating(review.rating);
                      }}>Edit</button>
                      <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="add-review">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
          />
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${newRating >= star ? 'selected' : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
          {error && <p className="error">{error}</p>}
          <button onClick={handleAddReview}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
