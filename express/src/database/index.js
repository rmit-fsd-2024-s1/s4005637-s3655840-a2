const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.special = require("./models/special.js")(db, DataTypes);
db.cart = require("./models/cart.js")(db, DataTypes);
db.user = require("./models/user.js")(db, DataTypes);
db.review = require("./models/review.js")(db, DataTypes);

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  // Only seed data if necessary.
  let count = await db.special.count();

  if (count == 0) {
  // Create specials.
  await db.special.bulkCreate([
    { title: 'Fish-Max', description: 'Rich source of natural nutrients and amino acids, improves soil and plant health.', price: 999, objectID: 1, image: "fishmax.jpg", sale: true },
    { title: 'Fish-Plus', description: 'Improves soil health, suppresses disease, and enhances nutrient availability.', price: 1599, objectID: 2, image: "fishplus.jpg", sale: true},
    { title: 'Fish-Emulsion', description: 'Feeds soil microbes, improves moisture retention and nutrient availability.', price: 3099, objectID: 3, image: "fishemulsion.jpg", sale: true},
    { title: 'Fol-Up', description: 'Contains fulvic acid for use as a foliar fertiliser, improves nutrient uptake.', price: 599, objectID: 4, image: "folup.jpg", sale: true },
    { title: 'Fulvic Acid Power', description: 'Enhances uptake of minerals and nutrients by plants.', price: 1699, objectID: 5, image: "fulvic.jpg", sale: true },
    { title: 'Soil Enhancer', description: 'Contains humus, seaweed extracts, amino acids, and vitamins.', price: 2499, objectID: 6, image: "soil.jpg", sale: true },
    { title: 'Soil Activator', description: 'Boosts microbes, improves soil health, stimulates plant growth.', price: 1999, objectID: 7, image: "Soil-Activator.jpg", sale: false },
    { title: 'Humus 100', description: 'High quality, highly soluble humic & fulvic acid powder.', price: 2999, objectID: 8, image: "Humus-100.jpg", sale: false }
  ]);  
  }

  count = await db.user.count();

  if (count == 0) {
  //create user
  const argon2 = require("argon2")
 
  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.bulkCreate([
    { username: 'test1test', email: 'test1@email.com', password_hash: hash, date: "1970-01-01" },
  ]);
}

  count = await db.review.count();

  if (count == 0) {
  //create user
  await db.review.bulkCreate([
    { author: 'Sam', body: 'Very happy with product, will buy again', rating: 4, productID: 1 },
    { author: 'Alice', body: 'Really happy with this product', rating: 5, productID: 1 },
    { author: 'Denis', body: 'Hope to buy again', rating: 3, productID: 1 },
    { author: 'Matthew', body: 'Strong dislike this product, will not buy again', rating: 1, productID: 2 },
    { author: 'Peter', body: "I've had better, but this was alright", rating: 2, productID: 3 },
  ]);
}

}

module.exports = db;
