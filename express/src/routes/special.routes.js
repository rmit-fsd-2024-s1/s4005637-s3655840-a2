module.exports = (express, app) => {
  const controller = require("../controllers/special.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single special with id.
  router.get("/select/:id", controller.one); // get rid of this maybe

  // Select products or specials
  router.get("/select1/:sale", controller.findBySale);

  // Add routes to server.
  app.use("/api/specials", router);
};
