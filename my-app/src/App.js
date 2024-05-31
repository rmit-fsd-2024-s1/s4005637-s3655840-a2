import React from 'react';
import './App.css';
import Header from './pages/Header';
import Navbar from './pages/Navbar';
import Content from './pages/Content';
import Footer from './pages/Footer';
import Specials from './pages/Specials';
import Cart from './pages/Cart';
import Confirm from './pages/Confirm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './pages/LoginForm';
import { initCart, initUsers } from './data/repository';
import SignupForm from './pages/SignupForm';
import Profile from './pages/Profile';
import Program1 from './programs/Program1';
import Program2 from './programs/Program2';
import Program3 from './programs/Program3'; // import all appropiate pages and functions
import Reviews from './pages/Reviews';
import Products from './pages/Products';


function App() {
    
    initUsers();
    initCart();

  return (
    <div>
      <Header /> {/* Display header component */}
      <Navbar /> {/* Display navbar component */}
      <Router> 
        <Routes>
        <Route path="content" element={<Content />}/> 
        <Route path="/" element={<Content/>}/> {/* set content page as homepage */}
        
          <Route path="specials" element={<Specials/>}/>
          <Route path="login" element={<LoginForm/>}/>
          <Route path="signup" element={<SignupForm/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="Program1" element={<Program1/>}/>
          <Route path="Program2" element={<Program2/>}/>
          <Route path="Program3" element={<Program3/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="confirm" element={<Confirm/>}/>
          <Route path="reviews/:id" element={<Reviews/>}/>
          <Route path="products" element={<Products/>}/>

        </Routes>


        

      </Router>

      <Footer /> {/* display footer component */}
  </div> 
  );
}

export default App;