const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const { username } = req.params;
  const user = await db.user.findOne({ where: { username } });
  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    username: req.body.username,
    email: req.body.email,
    password_hash: hash,
    date: req.body.date
  });

  res.json(user);
};

  //Update profile in database
exports.update = async (req, res) => {
  const user = await db.user.findAll({ where:{email: req.body.email, username: req.body.username}});
  //updating profile fields
  user.username = req.body.username;
  user.email = req.body.email;

  await user.save();
  res.json(user);
};

exports.get = async (req, res) => {
  const { username } = req.params;
  const user = await db.user.findAll({ where: { username } });
  res.json(user);
};