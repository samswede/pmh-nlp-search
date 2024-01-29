//const { getTextEmbeddingAda } = require('../../models/embedding.model');
const { embeddTextAda } = require('../../services/openAI');
const { embeddTextHF } = require('../../services/huggingFace');


async function httpGetTextEmbeddingAda(req, res) {
    try {
        const text = req.body.text;

        const embedding = await embeddTextAda(text);
        return res.status(200).json(embedding);
    
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

async function httpGetTextEmbeddingHF(req, res) {
    try {
        const text = req.body.text;

        const embedding = await embeddTextHF(text);
        return res.status(200).json(embedding);
    
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


module.exports = {
    httpGetTextEmbeddingAda,
    httpGetTextEmbeddingHF
};