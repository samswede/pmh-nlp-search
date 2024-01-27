const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const createEmbedding = async (text) => {
  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: text,
  })
  const [{ embedding }] = embeddingResponse?.data?.data

  console.log('embedding', embedding)

  return embedding
}

module.exports = { createEmbedding }