const db = require("../database");

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

exports.one = async (req, res) => {
  const special = await db.special.findByPk(req.params.id);

  res.json(special);
};

exports.findBySale = async (req, res) => {
  const { sale } = req.params;
  const special = await db.special.findAll({ where: { sale } });
  res.json(special);
};