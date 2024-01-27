const mongoose = require('mongoose');
const { collection } = require('../models/fonts.mongo');

// this is only added here for our tests to work
require('dotenv').config();

// set up MongoDB connection
// this is from the MongoDB Atlas website, where we created our database
// under the "Connect" button, we chose the driver "Node.js".
// replace the <password> with the password we created for the database user

let MONGO_URL;

if (process.env.MONGO_URL) {
    //this is active for testing in the CI/CD pipeline
    MONGO_URL = process.env.MONGO_URL

} else {
    //this is active for local testing and development
    const password = process.env.MONGO_DATABASE_PASSWORD;
    const databaseName = process.env.MONGO_DATABASE_NAME; // will be created if it doesn't exist
    MONGO_URL = `mongodb+srv://samuelandersson:${password}@cluster0.cdvhawq.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

    //mongodb+srv://samuelandersson:<password>@cluster0.cdvhawq.mongodb.net/?retryWrites=true&w=majority
}


// this is the new way of connecting to MongoDB
mongoose.connection.once('open', () => {
	console.log('MongoDB connection ready!');
});
mongoose.connection.on('error', (err) => {
	console.error(err);
});


async function mongoConnect() {
    /* OLD version of mongoose.connect
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
    */
   // NEW version of mongoose.connect we don't need to pass in the options anymore
   // it uses the best options by default
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

async function mongoVectorSearch(embedding, numCandidates, limit) {
    try {
        const collection = mongoose.connection.collection('fonts');

        // Log the embedding to check its structure
        //console.log("Embedding:", embedding);

        const fontCandidates = await collection.aggregate([
            {
              "$vectorSearch": {
                "index": "default",
                "path": "embedding",
                "queryVector": embedding,
                "numCandidates": numCandidates,
                "limit": limit
              }
            }
          ])
        .toArray();

        return fontCandidates;

    } catch (err) {
        console.error('Failed to vector search for similar fonts:', err.message);
        // Rethrow the error or return a specific response
        throw err; // or throw err; // depending on your application's error handling strategy
    }
}



module.exports = {
    mongoConnect,
    mongoDisconnect,
    mongoVectorSearch,
};