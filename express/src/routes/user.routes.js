module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  //update a user profile
  router.put("/select/:id", controller.update);

  //delete user
  router.delete("/select/:id", controller.delete);
  //router.put("/", controller.update); <---- this code doesn't work "Error: Route.put() requires a callback function but got a [object Undefined]"


  // Add routes to server.
  app.use("/api/users", router);
};
