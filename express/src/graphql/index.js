const { gql } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const db = require("../database");

// Create and track a GraphQL PubSub.
const pubsub = new PubSub();

const COMMENT_ADDED_TRIGGER = "COMMENT_ADDED";

// Schema. *** "!" means that the field is required
const typeDefs = gql`
  type Comment {
    id: Int!
    content: String! 
  }

  type Query {
    comments: [Comment!]!
  }

  type Mutation {
    create_comment(content: String!): Comment!
  }

  type Subscription {
    comment_added: Comment!
  }
`;

// Resolvers.
const resolvers = {
  Query: {
    comments: async () => {
      return await db.comment.findAll();
    }
  },
  Mutation: {
    create_comment: async (_, { content }) => {
      const comment = await db.comment.create({ content: content });
  
      // Publish event to all subscribers.
      pubsub.publish(COMMENT_ADDED_TRIGGER, { comment_added: comment });
  
      return comment;
    }
  },
  Subscription: {
    comment_added: {
      subscribe: () => pubsub.asyncIterator(COMMENT_ADDED_TRIGGER)
    }
  }
};

module.exports = {
  typeDefs, resolvers
};
