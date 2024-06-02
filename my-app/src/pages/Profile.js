import React, { useState, useEffect } from "react";
import { updateUser, getLogin, removeUser, loginUser, getUserProfile, updateProfile } from "../data/repository";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  let username = getLogin();
  let accountName = username.replace(/^"(.+(?="$))"$/, '$1'); // Remove "" from the account name
  let [fields, setFields] = useState({ username: accountName, email: "", password: "", date: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Load profile.
  useEffect(() => {
    async function loadProfile() {
      const currentProfile = await getUserProfile(accountName);
      setFields(currentProfile);
    }
    loadProfile();
  }, [accountName]);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email } = fields;

    if (username.trim() === "" || email.trim() === "") { // check if both fields are not empty
      setErrorMessage("Username and Email are required."); // display error message if fields are empty
      return;
    }

    // Update user info in DB
    const updatedProfile = await updateProfile(username, email);
    navigate("/content");
    loginUser(updatedProfile.username);
    updateUser(accountName, updatedProfile.username, updatedProfile.email); // Change information in localStorage
    alert("Congrats! Your profile has been changed"); // display confirmation message that information has been changed
    window.location.reload();
  };

  const handleDelete = (event) => { // allow user to delete their account and remove the information from localStorage
    event.preventDefault();

    const confirmation = window.confirm( // display confirmation message to confirm if user wants to delete their profile
      "Are you sure you want to delete your account?\n\n" + accountName + "\n\nAll your data and information will be deleted"
    );

    if (confirmation) { // display confirmation message that account has been deleted, log user out of their account and return to homepage
      alert("Your account: " + accountName + " has been deleted");
      removeUser(accountName);
      loginUser("false");
      navigate("/content");
      window.location.reload();
    }
  }

  return (
    <>
      <div className="main1">
        <h1>{accountName}'s Profile</h1>
      </div>
      <div className="cont-2">
        <form onSubmit={handleSubmit}>
          <div className="form-1">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              value={fields.username}
              onChange={handleInputChange}
            />
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
            <span>User since {fields.date}</span>
            <input type="submit" className="btn btn-success" value="Apply Changes" />
          </div>
          {errorMessage !== null && (
            <div className="form-1">
              <span className="text-danger">{errorMessage}</span>
            </div>
          )}
        </form>
        <form onSubmit={handleDelete}>
          <div className="form-2">
            <input type="submit" className="btn btn-delete" value="Delete User" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;