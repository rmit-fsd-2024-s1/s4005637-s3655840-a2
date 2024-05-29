const db = require("../database");

// Select all users from the database.
exports.all = async (req, res) => {
  const items = await db.cart.findAll();

  res.json(items);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const cart = await db.cart.findByPk(req.params.id);

  res.json(cart);
};

exports.create = async (req, res) => {
  const cart = await db.cart.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    objectID: req.body.objectID,
    image: req.body.image
  });

  res.json(cart);
};