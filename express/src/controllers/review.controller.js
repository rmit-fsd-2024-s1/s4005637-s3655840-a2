const db = require("../database");

exports.all = async (req, res) => {
  const reviews = await db.review.findAll();
  
  res.json(reviews);
};

exports.findByProductID = async (req, res) => {
  const { productID } = req.params;
  const review = await db.review.findAll({ where: { productID } });
  res.json(review);
};

exports.create = async (req, res) => {
  const review = await db.review.create({
    author: req.body.author,
    body: req.body.body,
    rating: req.body.rating,
    productID: req.body.productID
  });

  res.json(review);
};