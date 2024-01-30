const http = require('http');

require('dotenv').config();

const app = require('./app');

// import services, e.g. database connection
const { testAdaModel,
        testGenerateText } = require('./services/openAI');

const { createGlobalPipelines } = require('./services/huggingFace');

const { mongoConnect } = require('./services/mongo');

const { loadPostsData,
        areAllPostsLoaded } = require('./models/posts.model');


const PORT = process.env.PORT || 8000;


const server = http.createServer(app);


/*
This below is a very common node pattern.
We want to make sure that the data is loaded before we start the server.
We will use async/await to do this.

We could be loading a database, or a file, or anything else that takes time to load.
*/


async function startServer() {
    // wait for the database to load

    //await testGenerateText();
    
    await mongoConnect();

    // const openAiConnection = await openAiConnect();

    // make the global variable so that we can use it in the embeddTextHF function
    // this prevents us from having to create the pipeline every time we want to embed text
    // perhaps there is a better way to do this? Global variables are not recommended...
    await createGlobalPipelines();

    if (await areAllPostsLoaded()) {
        console.log('Skipping loading posts...');
    } else {
        await loadPostsData();
    }

    //await loadPostsData();


    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
    });
}

startServer();

//const express = require('express');
//const app = express();
//app.listen();
