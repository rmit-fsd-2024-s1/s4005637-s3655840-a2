import { request, gql } from "graphql-request";
import axios from "axios";

const GRAPH_QL_URL = "http://localhost:4000/graphql";
const API_HOST = "http://localhost:4000";
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
  const response = await axios.get(API_HOST + "/api/specials");

  return response.data;
}

async function getCart() {
  const response = await axios.get(API_HOST + "/api/carts");

  return response.data;
}

async function updateCart(item) {
  const response = await axios.post(API_HOST + "/api/carts", item);

  return response.data;
}

async function deleteItem(id) {
  const response = await axios.delete(API_HOST + `/api/carts/select/${id}`);

  return response.data;
}

async function createUser(username) {
  const response = await axios.post(API_HOST + "/api/users", username); //username of fields?
  return response.data;
}

<<<<<<< HEAD
async function getItem(id) {
  const response = await axios.get(API_HOST + `/api/specials/select/${id}`);

  return response.data;
}

async function getReviews(id) {
  const response = await axios.get(API_HOST + `/api/reviews/select/${id}`);

  return response.data;
}



=======
async function saveUser(oldUser, newUser, email) {
  const response = await axios.put(API_HOST + "/api/users", oldUser, newUser, email);
  return response.data;
}
>>>>>>> bf4044eeed6afa1ca8865801b4816e0d328e9fd0
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
  getSpecials,
  getCart,
  deleteItem,
  createUser,
<<<<<<< HEAD
  getItem,
  getReviews
=======
  saveUser,
>>>>>>> bf4044eeed6afa1ca8865801b4816e0d328e9fd0
}