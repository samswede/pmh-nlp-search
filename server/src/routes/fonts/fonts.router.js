const express = require('express');

const {
    httpGetAllFonts, 
    httpGetAllFontsNames,
    httpGetFontFromName,
    httpGetFontFromIndex,
    httpGetSimilarFontsFromEmbedding,
    httpGetSimilarFontsFromName } = require('./fonts.controller');

const fontsRouter = express.Router();

fontsRouter.get('/', httpGetAllFonts);
fontsRouter.get('/all-names', httpGetAllFontsNames);

fontsRouter.get('/name', httpGetFontFromName);
fontsRouter.get('/index', httpGetFontFromIndex);

fontsRouter.post('/query-embedding', httpGetSimilarFontsFromEmbedding);
fontsRouter.post('/query-name', httpGetSimilarFontsFromName);

module.exports = fontsRouter;