const express = require('express');

const {
    httpPostGenerateTextHF } = require('./generation.controller');

const generationRouter = express.Router();

generationRouter.post('/hf', httpPostGenerateTextHF);


module.exports = generationRouter;