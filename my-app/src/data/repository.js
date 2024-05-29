import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- Comments -----------------------------------------------------------------------------------
const USERS_KEY = "users";
const USER_KEY = "user";
const LOGIN_STATE = "login";
const CART = "cart";

function initUsers() { // initialise default users 
  if (localStorage.getItem(USERS_KEY) !== null)
    return;

  const users = [
    {
      username: "elijah",
      email: "elijah@soil.com",
      password: "abc123",
      date: "1970-01-01"
    },
    {
      username: "thomas",
      email: "thomas@soil.com",
      password: "def456",
      date: "1970-01-01"
    }
  ];

  let login = "false"; // set login state to "false"

  localStorage.setItem(LOGIN_STATE, JSON.stringify(login));
  localStorage.setItem(USERS_KEY, JSON.stringify(users)); // store login and default user information into localStorage
}

function initCart() { // initialise cart
  if (localStorage.getItem(CART) !== null)
    return;

  const cart = [
  ];

  localStorage.setItem(CART, JSON.stringify(cart)); // store cart in localStorage
}

function updateCart(item) {
  // Retrieve the current cart from localStorage
  const cart = JSON.parse(localStorage.getItem(CART)) || [];

  // Add the item to the cart
  cart.push(item);

  // Update the cart in localStorage
  localStorage.setItem(CART, JSON.stringify(cart));
}
function getUsers() { // Get user information from localStorage

  const data = localStorage.getItem(USERS_KEY);


  return JSON.parse(data);
}

function verifyUser(username, password) { // Verify if user exists in localStorage
  const users = getUsers();
  console.log(users);
  for (const user of users) {
    if (username === user.username && password === user.password) {
      setUser(username);
      return true;
    }
  }

  return false;
}

function setUser(username) {
  localStorage.setItem(USER_KEY, username);
}

function getUser() { // Retrieve user information
  return localStorage.getItem(USER_KEY);
}

function getLogin() { // get login state
  return localStorage.getItem(LOGIN_STATE);
}

function removeUser(username) { // remove user from localStorage
  const users = getUsers();

  const updatedUsers = users.filter((user) => user.username !== username); // filter the specific user information from localStorage

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers)); // update the new user list in localStorage
}

function addUser(username, email, password, date) { // Add new user to localStorage
  const users = getUsers();

  users.push({ username, email, password, date });

  localStorage.setItem(USERS_KEY, JSON.stringify(users)); // set the new list with new user information
}

function loginUser(username) { // change login state
  let login = getLogin();

  login = username;

  localStorage.setItem(LOGIN_STATE, JSON.stringify(login));
}

function updateUser(oldUser, newUser, email) { // change user information in localStorage
  const users = getUsers();

  const index = users.findIndex((user) => user.username === oldUser); // Find specific user with old name

  if (index !== -1) { // update the old name and email with new name and email
    users[index].username = newUser;
    users[index].email = email;

    localStorage.setItem(USERS_KEY, JSON.stringify(users)); // save the updated list to localStorage
    loginUser(newUser); // sign in user with updated name
  }
}

function getUsername(email) { // find user name using specific email from that entry
  const users = getUsers();

  const index = users.findIndex((user) => user.email === email);

  if (index !== -1) {
    const username = users[index].username
    return username;
  }
}

async function getSpecials() {
  // Simply query with no parameters.
  const query = gql`
   {
    all_specials {
      title
      description
      price
      objectID
      image
    }
  }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_specials;
}

export { // export all the needed functions
  initUsers,
  initCart,
  verifyUser,
  updateCart,
  getUser,
  removeUser,
  addUser,
  loginUser,
  getLogin,
  updateUser,
  getUsername,
  getSpecials
}