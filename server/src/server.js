const http = require('http');

require('dotenv').config();

const app = require('./app');

// import services, e.g. database connection

/*
TO DO:
    - modify mongo connect to connect to vector database rather than normal database
*/
const { mongoConnect } = require('./services/mongo');




// import models, e.g. data, ONNX models, etc.
/*
TO DO:
    - load font data to vector database (if not already loaded)
    - load ONNX model on server start
*/
const { loadFontsData } = require('./models/fonts.model');
//const { loadEncoderModel } = require('./models/encoder.model');




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
    
    await mongoConnect();

    await loadFontsData();

    // wait for the model to load
    //await loadEncoderModel();

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
    });
}

startServer();

//const express = require('express');
//const app = express();
//app.listen();
