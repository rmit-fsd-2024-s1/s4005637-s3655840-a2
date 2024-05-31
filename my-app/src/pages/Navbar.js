import React from 'react';
import { loginUser } from '../data/repository';

function ProfileMenu() {

  const LogOut = () => {
    loginUser("false"); // set log in to "false" so the user is logged out
  };

  let login = JSON.parse(localStorage.getItem("login")); // get login state from localStorage

  if (login === "false") { // if user isn't logged in display login and signup options
    return (<div>
            <a href="/signup" class="right">Signup</a>
            <a href="/login" class="right">Login</a>
            </div>
          );
  }
  return ( // if user is logged in display profile and cart options, with the profile option in a dropdown menu
    <>
    <div className="dropdown">
      <button className="dropbtn">Profile <i className="fa fa-caret-down"></i></button>
      {(
        <div className="dropdown-content">
          <a href="/profile">View Profile</a>
          <a href="/content" onClick={LogOut}>Logout</a> {/* log the user out of their account */}
        </div>
      )}
    </div>
    <a href="/cart" class="right">Cart</a>
    </>
        );
}

const Navbar=()=> {
    return (
      <div class="navbar">
        <a href="/content">Home</a>
        <a href="/products">Products</a>
        <a href="/specials">Specials</a>
    
        <ProfileMenu/> {/* Display profile and cart options if user is logged in, if not display signup and login options */}
      </div>
    );
}

export default Navbar