import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, loginUser, createUser, getUserProfile } from "../data/repository";

function isValidEmail(email) { // check if the email is a valid email
  // Check if the email contains "@" symbol
  if (email.indexOf('@') === -1) {
    return false;
  }

  // Split email into name part and domain part
  const [namePart, domainPart] = email.split('@');

  // Check if name part and domain part are not empty
  if (namePart === '' || domainPart === '') {
    return false;
  }

  // Check if domain part contains a dot
  if (domainPart.indexOf('.') === -1) {
    return false;
  }

  return true;
}

function isStrongPassword(password) { // check if the password is a strong password

  if (password.length < 8) { // password must be greater than 8 characters
    return "Flength";
  }

  let j = 0

  for (let i = 0; i < password.length; i++) { // password must contain at least one numeral
  
    if (!isNaN(parseInt(password[i]))) {
      j++;
    }
  }

  if (j === 0) {
    return "Fnumeral";
  }
  return "success";
}

function SignupForm(props) { // Component to allow user to create a new account
  const [fields, setFields] = useState({ username: "", email: "", password: ""});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const temp = { ...fields };
    temp[name] = value;
    setFields(temp);
  };

  const handleSubmit = async (event) => { //added async
    event.preventDefault();
    
    const { username, email, password} = fields;

    if (!isValidEmail(email)) { // if email not valid display appropiate error message
      setErrorMessage("Please enter a valid Email address")
      return
    }

    let passwordTest = isStrongPassword(password) // check for strong password

    if (passwordTest === "Fnumeral") { // if password isn't strong enough display appropiate error message
      setErrorMessage("Password must contain at least one numeral");
      return;
    } else if (passwordTest === "Flength") {
      setErrorMessage("Password length must be greater than 8");
      return;
    }
      
    if (username.trim() === "" || password.trim() === "" || email.trim() === "") { // if any input boxes are empty return error message
      setErrorMessage("Username, Email and password are required.");
      return;
    }
    const date = new Date().toISOString().split('T')[0]; // record date of account creation
    
    const user = await createUser(fields); //create user to DB?
    navigate("/content");
    loginUser(user);
    
    addUser(username, email, password, date); // add all information to localStorage

    alert("Congrats! Your account: " + username + " has been created") // display confirmation message once account is created

    loginUser(username); // login user into localStorage
    navigate("/content"); // navigate to homepage
    window.location.reload(); // reload page so website and localStorage are updated
  };

  const handleValidation = async () => {
    const Tfields = trimfields();
    const currentErrors = { };

    let key = "username";
    let fields = Tfields[key];
    if(fields.length === 0)
      setErrorMessage("Input info")
    else if(await getUserProfile(fields.username) !== null)
      setErrorMessage("Username already registered.")

  }


  return (
    <div className="cont">
      <h1>Signup</h1>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={fields.email}
            onChange={handleInputChange}
          />
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
          <input type="submit" className="btn btn-success" value="Signup"></input>
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

export default SignupForm;