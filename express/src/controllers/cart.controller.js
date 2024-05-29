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

// Delete one entry from the database.
exports.delete = async (req, res) => {
  try {
    const cart = await db.cart.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await cart.destroy();

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};