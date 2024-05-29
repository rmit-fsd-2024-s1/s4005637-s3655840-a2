const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = { };

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  # NOTE: The owner and pet are pseudo-joined; whilst they are related, how they are related is an implementation detail
  # that is NOT exposed in the GraphQL schema. This can be seen with the Pet type which has no field linking it to
  # an owner. That said an owner has many pets and this is exposed within the GraphQL schema by association.
  # Behind the scenes the database pet table has an additional field called email which is a FK to owner.
  type Owner {
    email: String,
    first_name: String,
    last_name: String,
  }

  type Special {
    title: String,
    description: String,
    price: Int,
    objectID: Int,
    image: String
  }

  # The input type can be used for incoming data.
  input OwnerInput {
    email: String,
    first_name: String,
    last_name: String
  }

  # Queries (read-only operations).
  type Query {
    all_owners: [Owner],
    all_specials: [Special],
    owner(email: String): Owner,
    owner_exists(email: String): Boolean
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    create_owner(input: OwnerInput): Owner,
    update_owner(input: OwnerInput): Owner,
    delete_owner(email: String): Boolean
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_owners: async () => {
    return await db.owner.findAll();
  },
  all_specials: async () => {
    return await db.special.findAll();
  },
  owner: async (args) => {
    return await db.owner.findByPk(args.email);
  },
  owner_exists: async (args) => {
    const count = await db.owner.count({ where: { email: args.email } });

    return count === 1;
  },

  // Mutations.
  create_owner: async (args) => {
    const owner = await db.owner.create(args.input);

    return owner;
  },
  update_owner: async (args) => {
    const owner = await db.owner.findByPk(args.input.email);
  
    // Update owner fields.
    owner.first_name = args.input.first_name;
    owner.last_name = args.input.last_name;

    await owner.save();

    return owner;
  },
  delete_owner: async (args) => {
    const owner = await db.owner.findByPk(args.email);
  
    if(owner === null)
      return false;

    // First remove all pets owned by the owner.
    await owner.destroy();

    return true;
  }
};

module.exports = graphql;

// Below are some sample queries that can be used to test GraphQL in GraphiQL.
// Access the GraphiQL web-interface when the server is running here: http://localhost:4000/graphql
/*

{
  all_owners {
    email,
    first_name,
    last_name,
    pets {
      pet_id,
    	name
    }
  }
}

{
  owner(email: "matthew@rmit.edu.au") {
    email,
    first_name,
    last_name
  }
}

{
  owner_exists(email: "matthew@rmit.edu.au")
}

mutation {
  create_owner(input: {
    email: "newuser@rmit.edu.au",
    first_name: "New",
    last_name: "User"
  }) {
    email,
    first_name,
    last_name
  }
}

mutation {
  update_owner(input: {
    email: "matthew@rmit.edu.au",
    first_name: "Matthew",
    last_name: "Bolger"
  }) {
    email,
    first_name,
    last_name
  }
}

mutation {
  delete_owner(email: "newuser@rmit.edu.au")
}

*/
