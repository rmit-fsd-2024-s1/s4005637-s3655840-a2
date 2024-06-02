import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser, loginUser } from "../data/repository";

function LoginForm(props) { 
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => { 
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await verifyUser(fields.username, fields.password);

    if (user === null) {
      // Login failed, reset password field to blank and set error message.
      setFields({ ...fields, password: "" });
      setErrorMessage("Username and/or password invalid, please try again.");
      return;
    }

    // Set user state.
    loginUser(fields.username);

    // Display confirmation message that user is logged in
    alert(`Welcome back ${user.username}! You are now logged in`);
      
    // Navigate to the content page.
    navigate("/content");
    window.location.reload()
  };

  return (
    <div className="cont">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-1">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            value={fields.username}
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