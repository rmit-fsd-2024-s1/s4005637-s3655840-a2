import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsername, loginUser } from "../data/repository";

function LoginForm(props) { // Signin component to log in user
  const [fields, setFields] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => { // Handle input change in the input boxes
    const name = event.target.name;
    const value = event.target.value;
    const temp = { ...fields };
    temp[name] = value;
    setFields(temp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === fields.email && u.password === fields.password // search for existing user in localStorage
    );

    if (user) {
      // User found, navigate to "/"
      // Login user and store in localStorage which user is logged in
      loginUser(getUsername(fields.email));
      // Display confirmation message that user is logged in
      alert("Welcome back " + getUsername(fields.email) + "! You are now logged in")
      
      navigate("/content"); // Navigate to homepage
      window.location.reload(); // Reload page so localStorage is updated and user is logged in
    } else {
      // User not found, display error message
      setErrorMessage("email and/or password invalid, please try again.");
    }
  };

  return (
    <div className="cont">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-1">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            value={fields.email}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="form-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={fields.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-1">
          <input type="submit" className="btn btn-success" value="Login"></input>
        </div>
        {errorMessage !== null && (
          <div className="form-1">
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;