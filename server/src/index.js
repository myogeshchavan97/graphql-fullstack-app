const { GraphQLServer, PubSub } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const users = require('./utils/users');

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription
  },
  context: {
    users,
    pubsub
  }
});

const options = {
  port: 4000,
  endpoint: '/graphql'
};

server.start(options, ({ port }) =>
  console.log(`server started on port ${port}.`)
);
