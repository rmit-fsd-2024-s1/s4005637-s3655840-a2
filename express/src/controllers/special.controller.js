const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const specials = await db.special.findAll();

  res.json(specials);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const special = await db.special.findByPk(req.params.id);

  res.json(special);
};