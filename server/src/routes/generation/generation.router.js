const express = require('express');

const {
    httpPostGenerateTextHF } = require('./generation.controller');

const generationRouter = express.Router();

generationRouter.get('/hf', httpPostGenerateTextHF);


module.exports = generationRouter;