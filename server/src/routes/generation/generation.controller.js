//const { generateTextGPT } = require('../../services/openAI');
const { generateTextHF } = require('../../services/huggingFace');


async function httpPostGenerateTextHF(req, res) {
    try {
        const userPrompt = req.body.userPrompt;
        const systemPrompt = req.body.systemPrompt;
        const context = req.body.context;

        const generatedText = await generateTextHF(userPrompt, systemPrompt, context);
        return res.status(200).json(generatedText);
    
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


module.exports = {
    httpPostGenerateTextHF
};