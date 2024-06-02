import axios from "axios";

const API_HOST = "http://localhost:4000";
const USERS_KEY = "users";
const USER_KEY = "user";
const LOGIN_STATE = "login";
const CART = "cart";

function initLogin() { 
  if (localStorage.getItem(LOGIN_STATE) !== null)
    return;
  
  let login = "false"; // set login state to "false"

  localStorage.setItem(LOGIN_STATE, JSON.stringify(login));
}

function getUsers() { // Get user information from localStorage

  const data = localStorage.getItem(USERS_KEY);


  return JSON.parse(data);
}

async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  
  if(user !== null)
    loginUser(user);

  return user;
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
  localStorage.setItem(LOGIN_STATE, JSON.stringify(username));
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
// get profile - get user info from DB
async function getItem(id) {
  const response = await axios.get(API_HOST + `/api/specials/select/${id}`);

  return response.data;
}

async function getReviews(id) {
  const response = await axios.get(API_HOST + `/api/reviews/select/${id}`);

  return response.data;
}

async function getProducts(sale) {
  const response = await axios.get(API_HOST + `/api/specials/select1/${sale}`);

  return response.data;
}

async function getUserProfile(username) {
  const response = await axios.get(API_HOST + `/api/users/select/${username}`);
  return response.data;
}
//update user info from db
async function updateProfile(username) {
  const response = await axios.put(API_HOST + `/api/users/select/${username}`);
  return response.data;
}
//delete user form DB
async function deleteUser(username) {
  const response = await axios.delete(API_HOST + `/api/users/select/${username}`);
  return response.data;
  
}

async function addReview(review) {
  const response = await axios.post(API_HOST + "/api/reviews", review);

  return response.data;
}

async function deleteReview(id) {
  const response = await axios.delete(API_HOST + `/api/reviews/select/${id}`);

  return response.data;
}

async function updateReview(updatedReview) {
  const response = await axios.put(API_HOST + `/api/reviews/select/${updatedReview.id}`, updatedReview);

  return response.data;
}

export { // export all the needed functions
  initLogin,
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
  getItem,
  getReviews,
  getUserProfile,
  updateProfile,
  deleteUser,
  addReview,
  deleteReview,
  updateReview,
  getProducts
}