const fs = require('fs');
const path = require('path');

const posts = require('./posts.mongo');  

const { mongoVectorSearch } = require('../services/mongo');
//const { embeddTextAda } = require('../services/openAI');
const { embeddTextHF } = require('../services/huggingFace');


function loadPostsData() {

    console.log('Loading posts...');

    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '..', '..', 'data', 'posts_collection_data.json'), 'utf8', async (err, data) => {
            if (err) {
                console.error(err);
                return reject(err);
            }

            try {
                const postsCollectionData = JSON.parse(data);

                // just test embedding with 5 posts (to save money)
                let i = 0.0; // i need this to be a float for the embedding

                for (const post of postsCollectionData) {

                    // just test embedding with 5 posts
                    i++;
                    if (i > 400) {
                        break;
                    }

                    // get embedding for each post
                    //const embedding = Array(3).fill(0.1+i); // test embedding
                    //const embedding = await embeddTextAda(post.description);
                    const embedding = await embeddTextHF(post.description);

                    // add fields to each post
                    post.index = i;
                    post.embedding = embedding;

                    // save each post to the mongo vector database
                    await savePost(post);
                    
                    console.log(`Post ${i} saved!`);
                }
                const countPostsFound = await getAllPosts();
                console.log(`${countPostsFound.length} posts found!`);
                resolve();
            } catch (parseErr) {
                console.error(parseErr);
                reject(parseErr);
            }
        });
    });
}

async function areAllPostsLoaded() {
    const postsAlreadyLoaded = await getAllPosts();

    const numPostsAlreadyLoaded = postsAlreadyLoaded.length;

    console.log(`Number of posts already loaded: ${numPostsAlreadyLoaded}`);

    if (numPostsAlreadyLoaded > 200) {
        console.log('All posts are already loaded!');
        return true;
    } else {
        console.log('Not all posts are loaded!');
        return false;
    }
};

async function getAllPosts() {
    return await posts.find({}, {
      '_id': 0, 
      '__v': 0,
    
    }); // exclude the _id and __v fields
    };

async function getAllPostsTitles() {
    return await posts.find({}, {
      '_id': 0, 
      '__v': 0,
      'embedding': 0,
      'description': 0,
      'author': 0,
    
    }); // exclude the _id and __v fields
    }

async function getPostFromTitle(title) {
    return await fonts.findOne({ title: title }, {
      '_id': 0, 
      '__v': 0,
    }); // exclude the _id and __v fields
    };



async function getSimilarPostsFromEmbedding(embedding, numCandidates, limit) {
    

    const postCandidates = await mongoVectorSearch(embedding, numCandidates, limit);

    //console.log(postCandidates);

    return postCandidates;

}

async function getSimilarPostsFromTitle(title, numCandidates, limit) {
    const post = await getPostFromTitle(title);
    const embedding = post.embedding;
    const postCandidates = await mongoVectorSearch(embedding, numCandidates, limit);
    return postCandidates;
}

async function getSimilarPostsFromText(text, numCandidates, limit) {
    const embedding = await embeddTextHF(text);
    const postCandidates = await mongoVectorSearch(embedding, numCandidates, limit);
    return postCandidates;
}
  
async function savePost(post) {
  try {
    await posts.updateOne({ 
        index: post.index }, // filter
    {
      $set: { // update
        index: post.index,
        title: post.title,
        description: post.description,
        embedding: post.embedding
      }
    }, 
      {
      upsert: true, // upsert means insert if not found
      },
    )

  } catch(err) {
    console.error(`Could not save post because: ${err}`);
  }
};
  

module.exports = {
    loadPostsData,
    areAllPostsLoaded,
    getAllPosts,
    getAllPostsTitles,
    getPostFromTitle,
    getSimilarPostsFromEmbedding,
    getSimilarPostsFromTitle,
    getSimilarPostsFromText,
    };