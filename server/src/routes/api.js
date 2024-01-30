const express = require('express');

// import the routers.
const postsRouter = require('./posts/posts.router');
const embeddingRouter = require('./embedding/embedding.router');
const generationRouter = require('./generation/generation.router');


const api = express.Router();

api.use('/posts', postsRouter);
api.use('/embedding', embeddingRouter);
api.use('/generation', generationRouter);


module.exports = api;