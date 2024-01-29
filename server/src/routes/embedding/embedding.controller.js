//const { getTextEmbeddingAda } = require('../../models/embedding.model');
const { textEmbeddingAda } = require('../../services/openAI');


async function httpGetTextEmbeddingAda(req, res) {
    try {
        const text = req.body.text;

        const embedding = await textEmbeddingAda(text);
        return res.status(200).json(embedding);
    
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


module.exports = {
    httpGetTextEmbeddingAda
};