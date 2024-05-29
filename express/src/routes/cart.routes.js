module.exports = (express, app) => {
  const controller = require("../controllers/cart.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Create a new post.
  router.post("/", controller.create);

  // Remove item from cart
  router.delete("/select/:id", controller.delete);

  // Add routes to server.
  app.use("/api/carts", router);
};
