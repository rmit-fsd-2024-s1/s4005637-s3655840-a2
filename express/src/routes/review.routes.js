module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select all reviews
  router.get("/", controller.all);

  // Select reviews by productID
  router.get("/select/:productID", controller.findByProductID);

  // Add routes to server
  app.use("/api/reviews", router);
};
