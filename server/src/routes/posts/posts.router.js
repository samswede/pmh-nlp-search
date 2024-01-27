const express = require('express');

const {
    httpGetAllPosts,
    httpGetAllPostsTitles,
    httpGetPostFromTitle,
    httpGetSimilarPostsFromEmbedding,
    httpGetSimilarPostsFromTitle } = require('./posts.controller');

const postsRouter = express.Router();

postsRouter.get('/', httpGetAllPosts);
postsRouter.get('/all-titles', httpGetAllPostsTitles);

postsRouter.get('/title', httpGetPostFromTitle);
//postsRouter.get('/index', httpGetFontFromIndex);

postsRouter.post('/query-embedding', httpGetSimilarPostsFromEmbedding);
postsRouter.post('/query-title', httpGetSimilarPostsFromTitle);

module.exports = postsRouter;