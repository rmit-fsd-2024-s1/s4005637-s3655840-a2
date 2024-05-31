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

exports.delete = async (req, res) => {
  const review = await db.review.findByPk(req.params.id);

  await review.destroy();

  res.json(review);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { body, rating } = req.body;

  const review = await db.review.findByPk(id);

  // Update the review fields
  review.body = body;
  review.rating = rating;

  // Save the updated review
  await review.save();

  res.json(review);
};
