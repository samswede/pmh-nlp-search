const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()

// Unsure if I have to create the connection here, or in the server.js file...

async function openAiConnect() {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
      
    const openAiConnection = new OpenAIApi(configuration)
      
    return openAiConnection;
      
}

const openAiConnection = await openAiConnect();



async function embeddTextAda(text) {
    const embeddingResponse = await openAiConnection.createEmbedding({
      model: 'text-embedding-ada-002',
      input: text,
    })
    const [{ embedding }] = embeddingResponse?.data?.data
  
    console.log('embedding', embedding)
  
    return embedding
  }
  

async function generateTextGPT(prompt) {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-16k',
      stream: false,
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })
  
    // console.log('response', response?.data?.choices[0]?.message?.content)
    return response?.data?.choices[0]?.message?.content
  }
  


module.exports = {
    openAiConnect,
    embeddTextAda,
    generateTextGPT
};