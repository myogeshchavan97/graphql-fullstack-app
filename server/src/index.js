const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
require('../db/connection');

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation
  }
});

const options = {
  port: 4000,
  endpoint: '/graphql'
};

server.start(options, ({ port }) =>
  console.log(`server started on port ${port}.`)
);
