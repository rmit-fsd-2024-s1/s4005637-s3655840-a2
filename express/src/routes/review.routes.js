module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select all reviews
  router.get("/", controller.all);

  // Select reviews by productID
  router.get("/select/:productID", controller.findByProductID);

  // Add new review
  router.post("/", controller.create);

  // Delete review
  router.delete("/select/:id", controller.delete);

  // Update review
  router.put("/select/:id", controller.update);

  // Add routes to server
  app.use("/api/reviews", router);
};
