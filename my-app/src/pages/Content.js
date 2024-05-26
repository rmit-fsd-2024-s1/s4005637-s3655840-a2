import React, { useState, useEffect } from 'react';
import leafyImg from '../images/leafy.jpg';
import gardeningImg from '../images/gardening.jpg';
import organicImg from '../images/organic.jpg';
import dietImg from '../images/diet.jpg';
import tipsImg from '../images/tips.jpg';

// An array of objects representing product information
const list = [
  {
    title: 'Organic Food',
    description: 'Improving soil health suppresses disease, improves plant growth & improves nutrient availability. Sourced from warm ocean fish caught in the Indian Ocean filleted for human consumption; low oil content. Food source for microbes.',
    objectID: 10,
    image: organicImg,
  },
  {
    title: 'Nutritional Planner',
    description: 'Improving soil health suppresses disease, improves plant growth & improves nutrient availability. Sourced from warm ocean fish caught in the Indian Ocean filleted for human consumption; low oil content. Food source for microbes.',
    objectID: 10,
    image: dietImg,
  },
  {
    title: 'Gardening Knowhow',
    description: 'Improving soil health suppresses disease, improves plant growth & improves nutrient availability. Sourced from warm ocean fish caught in the Indian Ocean filleted for human consumption; low oil content. Food source for microbes.',
    objectID: 10,
    image: gardeningImg,
  },
];


// ProfileSection component to display basic profile information on the homepage
const ProfileSection = ({ isLoggedIn }) => { // profile component to display basic profile information on the homepage
  let login = JSON.parse(localStorage.getItem("login"));
  let [fields, setFields] = useState({ username: login, email: "", password: "", date: ""});


  // UseEffect hook to fetch user data from local storage based on the username
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === fields.username);
    if (user) {
      setFields((prevFields) => ({ ...prevFields, email: user.email, date: user.date }));
    }
  }, [fields.username]);

  // Only display profile information if the user is signed in 
  if (login === "false") { 
    return null; 
  }

  return (
    <div className="profile">
    <h2>Welcome back! {login}</h2>
    <p>User since {fields.date}</p>
  </div>
  );
};

// Main Content component
const Content = () => {

  return (
    <>
      <ProfileSection/> {/* display profile component */}
      <div className="main1">
        <h1>Welcome to SOIL Organic Health Food Store and Nutritional Clinic</h1>
        <img src={leafyImg} alt="leafy" style={{ width: '100%', height: '700px' }} className="full-width-image" ></img>
        <div className="image-text">

          <h2 className="banner">"Experience the convenience of farm-fresh organic produce delivered straight to your doorstep with our 100% Organic Home Delivery Service - the farmers market that comes to you!"</h2>
        </div>

      </div>
      <div className="main2">
        {/* List of products */}
        <ul className="productlists">
          {list.map(function (item) {
            return (
              <li key={item.objectID}>
                <div>
                  <h2>{item.title} </h2>
                  <img src={item.image} alt=""></img>

                </div>
              </li>

            );
          })}
        </ul>
        {/* Button to see specials */}
        <div className="seeButton">
          <a href="Specials" className="buttonSee">SEE SPECIALS FOR THE WEEK</a>
        </div>
         {/* Gardening tips section */}   
        <div className="gardencont">
          <div className="img-container">
            <img src={tipsImg} alt="tips"></img>
          </div>
          <div className="text-container">
            <h3>Protect Your Crops To Improve Yield</h3>
            <p>Pests and disease can significantly damage your crop quality and yield.
              Defensive supports can be above ground, such as strengthening the leaf surface against pests and disease.
              Or defences can be below ground, for example colonising root systems with beneficial microbes to compete with pathogens.
              <br></br>
              Protecting plants at critical early stages in the growth cycle builds the strength of the plant’s self-defence systems.
              Stronger defence means less need for chemicals.
            </p>

          </div>
        </div>
        {/* Information section */}  
        <div class="info-container">
          <div class="left-section">

            <h3>Protection Strategies</h3>
            <p>Crop yield can be badly affected by pests and disease. Insecticides, fumigation and fungicides can counter them with varying degrees of success. Crop protection strategies harness the power of nature by:</p>
            <li>
              <b>Strengthening</b> - Silicon and Potassium, when used at the right time, help enhance the plant's own defenses.
            </li>
            <li>
              <b>Beneficial Microbes</b> - incorporate beneficial microbes to boost root systems and compete directly with pathogens (for example, Endophytic Trichoderma, Mycorrhizal Fungi)
            </li>
          </div>
          <div class="right-section">

            <h3>Potassium in plants</h3>
            <p>Potassium (K) is essential for translocation of sugars and starch formation. Potassium is also required for leaf stomata opening/closing, strengthens plants and improves plant resistance to drought and disease.</p>
            <p>Crops that have demonstrated beneficial response to soluble silicate application include:</p>

            <li>
              <b> Vegetables</b> - Capsicum, tomatoes, green beans, lettuce, corn, cucumber, melon, pumpkin, zucchini
            </li>

            <li>
              <b> Fruit</b> - Citrus, strawberries, grapes, apples
            </li>

            <li>
              <b>Broad-acre</b> - Rice, wheat, oats, barley, millet, cotton, sugar cane, soybeans, sorghum, maize
            </li>

            <li>
              <b>Ornamentals</b> - Turf grass, roses, palm, umbrella tree, dandelion and other ornamental plants.
            </li>

          </div>
        </div>

        {/* Services section */}
        <div className="services">
          <h1>Plan your next crop now with us! We offer wide range of services.</h1>
          <p> Whether your a beginner to gardening or a gardening expert, we share gardening tips and tricks specific to Australian gardens, to help you bring your garden to its full potential.
            <br></br><br></br>
            We cover a range of gardening tips, from pest control and plant diseases to yearly gardening tasks and complex landscaping. You can find helpful gardening information for small spaces, balconies, large yards and more.</p>
        </div>

        {/* Link section */}  
        <div class="link-container">
          <div class="link-wrapper left-link">

            <h2>Vegetable Planting Program</h2>
            <a href="Program1" class="link" id="link1">See Program</a>

            <div class="image-container" id="image1" >

            </div>
          </div>
          <div class="link-wrapper center-link">
            <h2>Soil Care/Testing </h2>
            <a href="Program2" class="link" id="link2">See Program</a>
            <div class="image-container" id="image2" >

            </div>
          </div>
          <div class="link-wrapper right-link">
            <h2>Potato Bags Gardening Guide</h2>
            <a href="Program3" class="link" id="link3" onClick="">See Program</a>
            <div class="image-container" id="image3" >

            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Content;