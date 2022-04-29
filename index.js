const { ApolloServer, gql } = require("apollo-server");

// TODA REQUEST É "POST" NÃO EXISTE MAIS AS OUTRAS
// TODA REQUEST BATE NO MESMO ENDPOINT. EX: /graphql
// QUERYS -> OBTER INFORMAÇÕES === (GET)
// MUTATION -> MANIPULAR DADOS === (POST/PUT/PATCH/DELETE)
// SCALAR TYPES -> STRING, INT, BOOLEAN, FLOAT, ID

const typeDefs = gql`
  type User {
    _id: ID! # ID! -> tipagem de identificador unico
    name: String! # ! -> obrigatorio
    email: String! # ! -> obrigatorio
    active: Boolean! # ! -> obrigatorio
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User! # aninhamento
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
  }
`;

const users = [
  {
    _id: String(Math.random()),
    name: "Rafael",
    email: "rafa@email.com",
    active: true,
  },
  {
    _id: String(Math.random()),
    name: "Gabriel",
    email: "Gabriel@email.com",
    active: false,
  },
  {
    _id: String(Math.random()),
    name: "Matheus",
    email: "matheus@email.com",
    active: true,
  },
];

const resolvers = {
  Query: {
    hello: () => "Hello world",
    users: () => users,
    getUserByEmail: (_, args) =>
      users.find((user) => user.email === args.email),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(({ url }) => console.log("🔥 Server running in " + url))
  .catch((err) => console.log(err));
