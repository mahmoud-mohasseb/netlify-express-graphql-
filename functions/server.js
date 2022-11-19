
const express = require('express');
const serverless = require('serverless-http');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// const mongoose = require('mongoose');
// const { Schema, model } = mongoose;
// mongoose.connect("mongodb+srv://mahmoud:...password@cluster0.b7skb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

// const blogSchema = new Schema({
//     title: String,
//     slug: String,
//     published: Boolean,
//     author: String,
//     content: String,
//     tags: [String],
//     createdAt: Date,
//     updatedAt: Date,
//   });
  
// const Blog = model('Blog', blogSchema);

// const article = new Blog({
//     title: 'Awesome Post!',
//     slug: 'awesome-post',
//     published: true,
//     content: 'This is the best post ever',
//     tags: ['featured', 'announcement'],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });
//   // Insert the article in our MongoDB database
// async function mahmoud(event, context) {
//     await article.save();
//     const firstArticle = await Blog.findOne({
//         title: 'Awesome Post!',
//         slug: 'awesome-post',
//         published: true,
//         content: 'This is the best post ever',
//         tags: ['featured', 'announcement'],
//     });

//     return {
//         statusCode: 200,
//         // body: firstArticle,
//         body: JSON.stringify({
//             firstArticle
//         }),
//     }
// }


const app = express();
const bodyParser = require('body-parser');

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
// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });
// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
// router.get('/mahmoud', (req, res) => res.json({ 
//     value: "hey",
//     email :"ghareb4@gmail.com"
// }));
// router.post('/', (req, res) => res.json({ postBody: req.body }));
router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
