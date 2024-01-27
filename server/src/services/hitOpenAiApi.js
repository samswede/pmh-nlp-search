const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

async function hitOpenAiApi(prompt) {
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

module.exports = { hitOpenAiApi }