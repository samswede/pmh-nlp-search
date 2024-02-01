
// before using docker in development...
const API_URL = 'http://localhost:8000/v1'; // v1 API route.

/*
// less specific when using docker...
const API_URL = 'v1';
*/
// Load fonts and return as JSON.
async function httpGetPosts() {
  const response = await fetch(`${API_URL}/posts/`)
  
  return await response.json();
}

// Get similar fonts by name
async function httpGetSimilarPostsFromIndex(index, numCandidates, limit) {
  const response = await fetch(`${API_URL}/posts/query-index`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index: index,
      numCandidates: numCandidates,
      limit: limit,
    }),
  });
  
  return await response.json();
}


// Get similar fonts by name
async function httpPostSearchPostsNLP(text, numCandidates, limit) {
  const response = await fetch(`${API_URL}/posts/query-text`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
      numCandidates: numCandidates,
      limit: limit,
    }),
  });
  
  return await response.json();
}


export {
  httpGetPosts,
  httpGetSimilarPostsFromIndex,
  httpPostSearchPostsNLP,
};