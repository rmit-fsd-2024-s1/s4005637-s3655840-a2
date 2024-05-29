import React, { useEffect, useState } from 'react'
import fishmaxImage from '../images/fishmax.jpg';
import fishplusImage from '../images/fishplus.jpg';
import fishemulsion from '../images/fishemulsion.jpg';
import folupImage from '../images/img4.jpg';
import fulvicImg from '../images/img5.jpg';
import soilImg from '../images/img6.jpg';
import { updateCart, getSpecials } from '../data/repository';

const Specials = () => {
  const [specials, setSpecials] = useState([]);


  // Load specials.
  useEffect(() => {
    loadSpecials();
  }, []);

  const loadSpecials = async () => {
    const currentSpecials = await getSpecials();

    setSpecials(currentSpecials);
  };

  const handleAddToCart = (special) => {
    updateCart(special)
    // Provide feedback to the user that the item has been added to the cart
    alert(`Added ${special.title} to the cart!`);
  };

  return (
    <div className="containerS">
      <h1>Specials for the week!</h1>
      <p>
        Healthy soils have strong levels of active carbon and diverse, active microbe populations. This results in good soil structure, strong nutrient availability and less disease.
        <br /><br />
        Active carbon is an important component of good soil structure and leads to better root growth, water penetration and retention. A healthy beneficial microbe population allows nutrients to remain available to plants for longer and reduces the incidence and severity of disease.
      </p>
      <div className="contentS">
        <ul>
        {specials.map(function (special) {
            const priceFormatted = `$${(special.price / 100).toFixed(2)}`; // format the price into dollars and cents
            return (
              <li key={special.objectID}>
                <div>
                  <h2>{special.title}</h2>
                  <img src={special.image} alt=""></img>
                  <p>{special.description}</p>
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
}
export default Specials;