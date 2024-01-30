const express = require('express');

const {
    httpGetAllPosts,
    httpGetAllPostsTitles,
    httpGetPostFromTitle,
    httpGetPostFromIndex,
    httpGetSimilarPostsFromEmbedding,
    httpGetSimilarPostsFromTitle,
    httpGetSimilarPostsFromIndex,
    httpGetSimilarPostsFromText } = require('./posts.controller');

const postsRouter = express.Router();

postsRouter.get('/', httpGetAllPosts);
postsRouter.get('/all-titles', httpGetAllPostsTitles);

postsRouter.get('/title', httpGetPostFromTitle);
postsRouter.get('/index', httpGetPostFromIndex);

postsRouter.post('/query-embedding', httpGetSimilarPostsFromEmbedding);
postsRouter.post('/query-title', httpGetSimilarPostsFromTitle);
postsRouter.post('/query-index', httpGetSimilarPostsFromIndex);
postsRouter.post('/query-text', httpGetSimilarPostsFromText);

module.exports = postsRouter;