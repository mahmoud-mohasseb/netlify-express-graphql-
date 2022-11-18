const mongoose = require('mongoose');
const { Schema, model } = mongoose;

mongoose.connect(process.env.PUBLIC_URL);

const blogSchema = new Schema({
    title: String,
    slug: String,
    published: Boolean,
    author: String,
    content: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
  });
  
const Blog = model('Blog', blogSchema);

const article = new Blog({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    published: true,
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  // Insert the article in our MongoDB database
async function mahmoud(event, context) {
    await article.save();
    const firstArticle = await Blog.findOne({
        title: 'Awesome Post!',
        slug: 'awesome-post',
        published: true,
        content: 'This is the best post ever',
        tags: ['featured', 'announcement'],
    });

    return {
        statusCode: 200,
        // body: firstArticle,
        body: JSON.stringify({
            firstArticle
        }),
    }
}
exports.handler = mahmoud
