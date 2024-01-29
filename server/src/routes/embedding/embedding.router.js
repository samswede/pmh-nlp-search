const express = require('express');

const {
    httpGetTextEmbeddingAda,
    httpGetTextEmbeddingHF } = require('./embedding.controller');

const embeddingRouter = express.Router();

embeddingRouter.get('/ada', httpGetTextEmbeddingAda);
embeddingRouter.get('/hf', httpGetTextEmbeddingHF);


module.exports = embeddingRouter;