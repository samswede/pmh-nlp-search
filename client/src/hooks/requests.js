
// before using docker in development...
const API_URL = 'http://localhost:8000/v1'; // v1 API route.

/*
// less specific when using docker...
const API_URL = 'v1';
*/
// Load fonts and return as JSON.
async function httpGetFonts() {
  const response = await fetch(`${API_URL}/fonts/all-names`)
  
  return await response.json();
}

// Get similar fonts by name
async function httpGetSimilarFontsFromName(name, numCandidates, limit) {
  const response = await fetch(`${API_URL}/fonts/query-name`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      numCandidates: numCandidates,
      limit: limit,
    }),
  });
  
  return await response.json();
}

// Submit drawing to server
async function httpSketchSearch(sketch) {
  // fetch uses the GET method by default, so we need to specify the POST method.
  // We also need to specify the Content-Type header, so that the server knows what kind of data we are sending.
  // We also need to stringify the data, because fetch only accepts strings.
  try {
    return await fetch(`${API_URL}/encoder`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sketch),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
  
}


export {
  httpGetFonts,
  httpGetSimilarFontsFromName,
  httpSketchSearch,
};