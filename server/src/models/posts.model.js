const fs = require('fs');
const path = require('path');

const fonts = require('./fonts.mongo');  

const { mongoVectorSearch } = require('../services/mongo');



function loadFontsData() {

    if (areAllFontsLoaded()) {
        return;
    }

    else {
        console.log('Loading fonts...');

        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', '..', 'data', 'font_collection.json'), 'utf8', async (err, data) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                try {
                    const fontsData = JSON.parse(data);
                    for (const font of fontsData) {
                        await saveFont(font);
                        //console.log(`Saved font ${font.name}`);
                    }
                    const countFontsFound = await getAllFonts();
                    console.log(`${countFontsFound.length} fonts found!`);
                    resolve();
                } catch (parseErr) {
                    console.error(parseErr);
                    reject(parseErr);
                }
            });
        });
    }
}

async function areAllFontsLoaded() {
    const fontsAlreadyLoaded = await getAllFonts();

    const numFontsAlreadyLoaded = fontsAlreadyLoaded.length;

    console.log(`Number of fonts already loaded: ${numFontsAlreadyLoaded}`);

    if (numFontsAlreadyLoaded > 914) {
        console.log('All fonts are already loaded!');
        return true;
    } else {
        console.log('Not all fonts are loaded!');
        return false;
    }
};

async function getAllFonts() {
    return await fonts.find({}, {
      '_id': 0, 
      '__v': 0,
    
    }); // exclude the _id and __v fields
    };

async function getAllFontsNames() {
    return await fonts.find({}, {
      '_id': 0, 
      '__v': 0,
      'embedding': 0,
      'description': 0,
      'image': 0,
    
    }); // exclude the _id and __v fields
    }

async function getFontFromName(name) {
    return await fonts.findOne({ name: name }, {
      '_id': 0, 
      '__v': 0,
    }); // exclude the _id and __v fields
    };

async function getFontFromIndex(index) {
    return await fonts.findOne({ index: index }, {
      '_id': 0, 
      '__v': 0,

    }); // exclude the _id and __v fields
    };

async function getSimilarFontsFromEmbedding(embedding, numCandidates, limit) {
    

    const fontCandidates = await mongoVectorSearch(embedding, numCandidates, limit);

    console.log(fontCandidates);

    return fontCandidates;

}

async function getSimilarFontsFromName(name, numCandidates, limit) {
    const font = await getFontFromName(name);
    const embedding = font.embedding;
    const fontCandidates = await mongoVectorSearch(embedding, numCandidates, limit);
    return fontCandidates;
}
  
async function saveFont(font) {
  try {
    await fonts.updateOne({ 
        index: font.index }, // filter
    {
      $set: { // update
        index: font.index,
        name: font.name,
        embedding: font.embedding
      }
    }, 
      {
      upsert: true, // upsert means insert if not found
      },
    )

  } catch(err) {
    console.error(`Could not save font because: ${err}`);
  }
};
  

module.exports = {
    loadFontsData,
    getAllFonts,
    getAllFontsNames,
    getFontFromName,
    getFontFromIndex,
    getSimilarFontsFromEmbedding,
    getSimilarFontsFromName
    };