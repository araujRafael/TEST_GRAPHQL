const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql``;
const resolvers = {};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(({ url }) => console.log("🔥 Server running in " + url))
  .catch((err) => console.log(err));