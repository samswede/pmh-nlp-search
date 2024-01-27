const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Create a new schema for uploaded documents
const FontDataSchema = new Schema({
    index: Number,
    name: String,
    //description: String,
    //image: String,
    embedding: [Number],
  // Represents the vector embedding
  // 1536 numbers in array (this is if you use OpenAI ada embeddings)
  // You can add other fields as needed
})

// Create a model from the schema
const UploadedFont = mongoose.model(
  'UploadedFont',
  FontDataSchema
)

module.exports = UploadedFont