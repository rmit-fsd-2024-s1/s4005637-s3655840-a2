import React, { useEffect, useState } from 'react';
import { updateCart, getProducts, getReviews } from '../data/repository';

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

const Specials = () => {
  const [specials, setSpecials] = useState([]); // set the list of specials
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const [reviewCounts, setReviewCounts] = useState({});

  // Load specials
  useEffect(() => {
    async function loadSpecials() {
      const currentSpecials = await getProducts(1);
      setSpecials(currentSpecials);
      setIsLoading(false);

      // Load ratings and review counts for each special
      const ratings = await Promise.all(currentSpecials.map(special => getRating(special.objectID)));
      const reviewCounts = await Promise.all(currentSpecials.map(special => getReviewCount(special.objectID)));
      const ratingsMap = {};
      const reviewCountsMap = {};
      currentSpecials.forEach((special, index) => {
        ratingsMap[special.objectID] = ratings[index];
        reviewCountsMap[special.objectID] = reviewCounts[index];
      });
      setRatings(ratingsMap);
      setReviewCounts(reviewCountsMap);
    }

    loadSpecials();
  }, []);

  const handleAddToCart = async (special) => {
    await updateCart(special);
    
    // Provide feedback to the user that the item has been added to the cart
    alert(`Added ${special.title} to the cart!`);
  };

  const getRating = async (objectID) => {
    const productReviews = await getReviews(objectID);
    if (productReviews.length === 0) return 0; // Avoid division by zero if there are no reviews
    const total = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return total / productReviews.length;
  };

  const getReviewCount = async (objectID) => {
    const productReviews = await getReviews(objectID);
    return productReviews.length;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'star filled' : 'star'}>&#9733;</span>
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading specials...</p>
      </div>
    );
  }
  
  return (
    <div className="containerS">
      <h1>Specials for the week!</h1>
      <div className="contentS">
        <ul>
          {specials.map((special) => {
            const priceFormatted = `$${(special.price / 100).toFixed(2)}`; // format the price into dollars and cents
            const rating = ratings[special.objectID] || 0;
            const reviewCount = reviewCounts[special.objectID] || 0;
            return (
              <li key={special.objectID}>
                <div>
                  <h2>{special.title}</h2>
                  <img src={imageMap[special.image]} alt={special.title} />
                  <p>{special.description}</p>
                  <a href={`/reviews/${special.objectID}`} className="star-rating">
                    {renderStars(Math.round(rating))}
                  </a>
                  <p className="review-count">{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</p>
                  <button className="buyButton" onClick={() => handleAddToCart(special)}>Buy</button>
                  <span className="priceTag">{priceFormatted}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Specials;
