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
db.owner = require("./models/owner.js")(db, DataTypes);
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
  let count = await db.owner.count();

  // Only seed data if necessary.
  if(count == 0) {
  // Create owners.
  await db.owner.bulkCreate([
    {
      email: "matthew@rmit.edu.au", first_name: "Matthew", last_name: "Bolger", mobile: "0412 123 123",
      street: "123 Fake Street", city: "Melbourne", state: "VIC", postcode: "3000"
    },
    { email: "shekhar@rmit.edu.au", first_name: "Shekhar", last_name: "Kalra" },
    { email: "alice@rmit.edu.au", first_name: "Alice", last_name: "Evans" },
    { email: "bob@rmit.edu.au", first_name: "Bob", last_name: "Alexander" },
    { email: "william@rmit.edu.au", first_name: "William", last_name: "Owens" },
    { email: "terra@rmit.edu.au", first_name: "Terra", last_name: "Rodgers" },
    { email: "leon@rmit.edu.au", first_name: "Leon", last_name: "Boreanaz" },
    { email: "cid@rmit.edu.au", first_name: "Cid", last_name: "Highwind" }
  ]);
}

  count = await db.special.count();

  if (count == 0) {
  // Create specials.
  await db.special.bulkCreate([
    { title: 'Fish-Max', description: 'Rich source of natural nutrients and amino acids, improves soil and plant health.', price: 999, objectID: 1, image: "fishmax.jpg" },
    { title: 'Fish-Plus', description: 'Improves soil health, suppresses disease, and enhances nutrient availability.', price: 1599, objectID: 2, image: "fishplus.jpg" },
    { title: 'Fish-Emulsion', description: 'Feeds soil microbes, improves moisture retention and nutrient availability.', price: 3099, objectID: 3, image: "fishemulsion.jpg" },
    { title: 'Fol-Up', description: 'Contains fulvic acid for use as a foliar fertiliser, improves nutrient uptake.', price: 599, objectID: 4, image: "folup.jpg" },
    { title: 'Fulvic Acid Power', description: 'Enhances uptake of minerals and nutrients by plants.', price: 1699, objectID: 5, image: "fulvic.jpg" },
    { title: 'Soil Enhancer', description: 'Contains humus, seaweed extracts, amino acids, and vitamins.', price: 2499, objectID: 6, image: "soil.jpg" }
  ]);  
  }

  count = await db.user.count();

  if (count == 0) {
  //create user
  await db.user.bulkCreate([
    { username: 'test1test', email: 'test1@email.com', password_hash: hash, }
  ]);
}

  count = await db.review.count();

  if (count == 0) {
  //create user
  await db.review.bulkCreate([
    { author: 'test1test', body: 'Very happy with product, will buy again', rating: 4, productID: 1 },
    { author: 'test2test', body: 'Really happy with this product', rating: 5, productID: 1 },
    { author: 'test3test', body: 'Hope to buy again', rating: 3, productID: 1 }
  ]);
}

}

module.exports = db;
