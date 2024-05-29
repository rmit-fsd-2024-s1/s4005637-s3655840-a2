const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const owners = await db.owner.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(owners);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const owner = await db.owner.create({
    text: req.body.text,
    username: req.body.username
  });

  res.json(owner);
};
