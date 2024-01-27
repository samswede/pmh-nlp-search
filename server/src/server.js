const http = require('http');

require('dotenv').config();

const app = require('./app');

// import services, e.g. database connection
const { testOpenAiConnection } = require('./services/openAI');

const { mongoConnect } = require('./services/mongo');

const { loadPostsData } = require('./models/posts.model');


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

    await testOpenAiConnection();
    
    await mongoConnect();

    // const openAiConnection = await openAiConnect();

    await loadPostsData();


    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
    });
}

startServer();

//const express = require('express');
//const app = express();
//app.listen();
