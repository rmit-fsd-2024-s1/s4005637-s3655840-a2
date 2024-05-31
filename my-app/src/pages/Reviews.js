import React, { useEffect, useState } from 'react';
import { getItem, getReviews, addReview } from '../data/repository'; // Assume these functions are defined in your repository
import { useParams } from 'react-router-dom';
import '../Reviews.css';

const imageMap = {
  "fishmax.jpg": require('../images/fishmaxImage.jpg'),
  "fishplus.jpg": require('../images/fishplusImage.jpg'),
  "fishemulsion.jpg": require('../images/fishemulsion.jpg'),
  "folup.jpg": require('../images/folupImage.jpg'),
  "fulvic.jpg": require('../images/fulvicImg.jpg'),
  "soil.jpg": require('../images/soilImg.jpg')
};

const Reviews = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProductDetails() {
      try {
        const productDetails = await getItem(id);
        console.log("Product ID:", productDetails.objectID);
        setProduct(productDetails);
        const productReviews = await getReviews(productDetails.objectID);
        console.log("Product Reviews:", productReviews);
        setReviews(productReviews);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading product details or reviews:", error);
        setIsLoading(false);
      }
    }
  
    loadProductDetails();
  }, [id]);

  /*const handleAddReview = async () => {
    if (newReview.trim()) {
      await addReview(id, newReview);
      const updatedReviews = await getProductReviews(id);
      setReviews(updatedReviews);
      setNewReview('');
    }
  };*/

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
        {console.log("Reviews:", reviews)}



          {reviews.map(function (review) {
            return (
            <li key={review.id} className="review">
              <div className="review-header">
                <span className="review-author">{review.author}</span>
                <span className="review-rating">{review.rating} stars</span>
              </div>
              <p>{review.body}</p>
            </li>
            );
        })}





        </ul>
        <div className="add-review">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
          />
          <button onClick={{/*handleAddReview*/}}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
