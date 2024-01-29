const { getAllPosts,
        getAllPostsTitles,
        getPostFromTitle,
        getSimilarPostsFromEmbedding,
        getSimilarPostsFromTitle,
        getSimilarPostsFromText } = require('../../models/posts.model');

/*
TO DO:
    -add get from index
*/
        

async function httpGetAllPosts(req, res) {
    return res.status(200).json(await getAllPosts());
}

async function httpGetAllPostsTitles(req, res) {
    return res.status(200).json(await getAllPostsTitles());
}

async function httpGetPostFromTitle(req, res) {
    const post = req.body;
    return res.status(200).json(await getPostFromTitle(post.title));
}

async function httpGetSimilarPostsFromEmbedding(req, res) {
    try {
        const embedding = req.body.embedding;
        const numCandidates = req.body.numCandidates;
        const limit = req.body.limit;
        const postCandidates = await getSimilarPostsFromEmbedding(embedding, numCandidates, limit);
        return res.status(200).json(postCandidates);
    
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

async function httpGetSimilarPostsFromTitle(req, res) {
    try {
        const title = req.body.title;
        const numCandidates = req.body.numCandidates;
        const limit = req.body.limit;
        const postCandidates = await getSimilarPostsFromTitle(title, numCandidates, limit);
        return res.status(200).json(postCandidates);
    
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

async function httpGetSimilarPostsFromText(req, res) {
    try {
        const text = req.body.text;
        const numCandidates = req.body.numCandidates;
        const limit = req.body.limit;
        const postCandidates = await getSimilarPostsFromText(text, numCandidates, limit);
        return res.status(200).json(postCandidates);
    
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}




module.exports = {
    httpGetAllPosts,
    httpGetAllPostsTitles,
    httpGetPostFromTitle,
    httpGetSimilarPostsFromEmbedding,
    httpGetSimilarPostsFromTitle,
    httpGetSimilarPostsFromText
};