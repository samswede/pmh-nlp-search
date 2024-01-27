const express = require('express');

// import the routers.
const postsRouter = require('./posts/posts.router');
//const encoderRouter = require('./encoder/encoder.router');


// mount the routers. 
/* NOTE:
        It does not matter what order we mount the routers.
        Because they will be matching against different routes,
        under different paths, so it doesn't matter which order
        we mount them in, relative to each other.

        Important part is we set up the routes correctly in the
        routers themselves.
*/

const api = express.Router();

api.use('/posts', postsRouter);
//api.use('/encoder', encoderRouter);


module.exports = api;