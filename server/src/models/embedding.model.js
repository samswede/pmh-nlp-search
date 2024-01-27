
//const { openAiConnect } = require('../services/openAI')
//const openAiConnection = openAiConnect()

const { embeddTextAda } = require('../services/openAI')


/*
TO DO:
    - may have to pass openAiConnection as a parameter... because I only want to create one connection to OpenAI
    - maybe this should be in the openAI service?
*/

async function getTextEmbeddingAda(text) {
    
    const embedding = await embeddTextAda(text)

  return embedding
}

module.exports = { getTextEmbeddingAda }