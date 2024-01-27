const express = require('express');

const {
    httpGetTextEmbeddingAda } = require('./embedding.controller');

const embeddingRouter = express.Router();

embeddingRouter.get('/ada', httpGetTextEmbeddingAda);


module.exports = embeddingRouter;