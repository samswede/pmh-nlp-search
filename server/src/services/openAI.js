const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openAiConnection = new OpenAIApi(configuration);

async function testOpenAiConnection() {
    try {
      console.log('Testing connection to OpenAI API...');
      const response = await openai.listEngines();
      console.log(response.data);
      console.log('Connection to OpenAI API successful!');
    } catch (error) {
      console.error(error);
    }
  }
  

async function embeddTextAda(text) {
    const embeddingResponse = await openAiConnection.createEmbedding({
      model: 'text-embedding-ada-002',
      input: [text], // Ensure input is an array
    });
    const [{ embedding }] = embeddingResponse.data;
  
    console.log('embedding', embedding);
  
    return embedding;
}

async function generateTextGPT(prompt) {
    const response = await openAiConnection.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
  
    return response.data.choices[0].message.content;
}

module.exports = {
    testOpenAiConnection,
    embeddTextAda,
    generateTextGPT
};
