import React, { useEffect, useState } from 'react'
import fishmaxImage from '../images/fishmax.jpg';
import fishplusImage from '../images/fishplus.jpg';
import fishemulsion from '../images/fishemulsion.jpg';
import folupImage from '../images/img4.jpg';
import fulvicImg from '../images/img5.jpg';
import soilImg from '../images/img6.jpg';
import { updateCart } from '../data/repository';

const Specials = () => {
     // State to hold the list of specials
  const [list, setList] = useState([]);

  useEffect(() => {
    // Retrieve the list from localStorage
    const storedList = localStorage.getItem('specialsList');

    if (storedList) {
      setList(JSON.parse(storedList)); // parse the stored list
    } else {
      // If list doesn't exist in localStorage, set the specials list
      const specialsList = [
        {
          title: 'Fish-Max',
          description: 'Fish Max also provides a rich source of natural nutrients and amino acids that can be used to feed soil biology and plants, resulting in healthier soils and plants. Research shows Fish Max feeds the soil microbes resulting in an increase in the activity and diversity of the resident microbial communities in the soil. ',
          price: 999,
          objectID: 0,
          image: fishmaxImage,
        },
        {
          title: 'Fish-Plus',
          description: 'Improving soil health suppresses disease, improves plant growth & improves nutrient availability. Sourced from warm ocean fish caught in the Indian Ocean filleted for human consumption; low oil content. Food source for microbes.',
          price: 1599,
          objectID: 1,
          image: fishplusImage,

        },
        {
          title: 'Fish-Emulsion',
          description: 'Research has consistently shown Fish Emulsion feeds soil microbes resulting in an increase in the activity and diversity of the resident microbial communities in the soil. The soil microbes improve soil health by improving moisture retention, infiltration, nutrient retention, nutrient availability and reduced disease. (Abbasi 2006)',
          price: 3099,
          objectID: 2,
          image: fishemulsion,

        },
        {
          title: 'Fol-Up',
          description: 'Fol-Up contains fulvic acid which is suitable for use directly as a foliar fertiliser or combined with other water-soluble fertilisers (NPK & trace elements). OFS Fol-Up bonds with most plant nutrients and makes them readily available for uptake by plants through foliar sprays, via overhead irrigation or hydroponic systems.',
          price: 599,
          objectID: 3,
          image: folupImage,

        },
        {
          title: 'Fulvic Acid Power',
          description: 'Fulvic Acids are created by soil-based micro-organisms. They improve uptake of minerals and nutrients by plants. Few Australian soils have adequate microbial life combined with enough soil organic matter to produce fulvic acid.',
          price: 1699,
          objectID: 4,
          image: fulvicImg,

        },
        {
          title: 'Soil Enhancer',
          description: 'Easy to use formulation that contains humus, the most active component of soil organic matter, seaweed extracts, amino acids and vitamins.',
          price: 2499,
          objectID: 5,
          image: soilImg,

        }
      ];
      setList(specialsList);
      // Store the specials list in localStorage
      localStorage.setItem('specialsList', JSON.stringify(specialsList));
    }
  }, []);

  const handleAddToCart = (item) => {
    updateCart(item)
    // Provide feedback to the user that the item has been added to the cart
    alert(`Added ${item.title} to the cart!`);
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
          {list.map(function (item) {
            const priceFormatted = `$${(item.price / 100).toFixed(2)}`; // format the price into dollars and cents
            return (
              <li key={item.objectID}>
                <div>
                  <h2>{item.title}</h2>
                  <img src={item.image} alt=""></img>
                  <p>{item.description}</p>
                  <button className="buyButton" onClick={() => handleAddToCart(item)}>Buy</button>
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