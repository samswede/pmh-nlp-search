const { getAllFonts,
        getAllFontsNames,
        getFontFromName,
        getFontFromIndex,
        getSimilarFontsFromEmbedding,
        getSimilarFontsFromName } = require('../../models/fonts.model');

async function httpGetAllFonts(req, res) {
    return res.status(200).json(await getAllFonts());
}

async function httpGetAllFontsNames(req, res) {
    return res.status(200).json(await getAllFontsNames());
}

async function httpGetFontFromName(req, res) {
    const font = req.body;
    return res.status(200).json(await getFontFromName(font.name));
}

async function httpGetFontFromIndex(req, res) {
    const font = req.body;
    return res.status(200).json(await getFontFromIndex(font.index));
}

async function httpGetSimilarFontsFromEmbedding(req, res) {
    try {
        const embedding = req.body.embedding;
        const numCandidates = req.body.numCandidates;
        const limit = req.body.limit;
        const fontCandidates = await getSimilarFontsFromEmbedding(embedding, numCandidates, limit);
        return res.status(200).json(fontCandidates);
    
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

async function httpGetSimilarFontsFromName(req, res) {
    try {
        const name = req.body.name;
        const numCandidates = req.body.numCandidates;
        const limit = req.body.limit;
        const fontCandidates = await getSimilarFontsFromName(name, numCandidates, limit);
        return res.status(200).json(fontCandidates);
    
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}




module.exports = {
    httpGetAllFonts,
    httpGetAllFontsNames,
    httpGetFontFromName,
    httpGetFontFromIndex,
    httpGetSimilarFontsFromEmbedding,
    httpGetSimilarFontsFromName,
};