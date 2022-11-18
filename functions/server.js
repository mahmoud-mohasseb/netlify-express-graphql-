
const express = require('express');
const serverless = require('serverless-http');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
// const mongoose = require('mongoose');

// const { Schema, model } = mongoose;

const app = express();

const bodyParser = require('body-parser');
// mongoose.connect("mongodb+srv://mahmoud:Ayan2704@cluster0.b7skb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world Express graphql on netlify !';
  },
};

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);