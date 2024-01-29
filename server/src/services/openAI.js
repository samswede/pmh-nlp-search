require('dotenv').config();

const { OpenAI } = require('openai');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


async function testGenerateText() {

  /*
  try {
    const gptResponse = await openai.complete({
      engine: 'davinci',
      prompt: 'This is a test',
      maxTokens: 5,
      temperature: 0,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ['\n']
    });
    console.log(gptResponse.data);
  } catch (error) {
    console.error(error);
  }
  */
  
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
    maxTokens: 5,
    temperature: 0,
    
  });
  console.log(chatCompletion.data);

}


async function testAdaModel() {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: ["hello world"], // Input text as an array
    });
    console.log("Success! Embedding:", response.data.data[0].embedding);
  } catch (error) {
    console.error("Error testing Ada model:", error);
  }
}
  

  async function embeddTextAda(text) {
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: [text], // Ensure the input is an array
    });
    const embedding = response.data[0].embedding;
    console.log('Embedding:', embedding);
    return embedding;
  }
  
  // Usage example for generating text with GPT-3.5 Turbo
  async function generateTextGPT(prompt) {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });
    return response.data.choices[0].message.content;
  }

module.exports = {
    testAdaModel,
    embeddTextAda,
    generateTextGPT,
    testGenerateText
};
