
const {parse} = require('csv-parse');
const fs = require('fs');

const csvData = [];

fs.createReadStream('../../data/embeddings/font_embeddings.csv')
    .pipe(parse({
            delimiter: ',',
            columns: true // If you don't set this, the first line will be skipped and used as headers.
        }))
    .on('data', (row) => {
        csvData.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        console.log(csvData);
    });

/*
OUTPUT:

    [{
    index: '16',
    'Enc. Variable 0': '1.4090451',
    'Enc. Variable 1': '-0.21787634',
    'Enc. Variable 2': '-0.54448926',
    'Enc. Variable 3': '-0.15692818',
    'Enc. Variable 4': '0.93786895',
    'Enc. Variable 5': '-0.08688001',
    'Enc. Variable 6': '-0.38696796',
    'Enc. Variable 7': '0.6372339',
    'Enc. Variable 8': '-0.25856775'
  },
  {
    index: '17',
    'Enc. Variable 0': '-0.99576724',
    'Enc. Variable 1': '1.3474624',
    'Enc. Variable 2': '0.22759224',
    'Enc. Variable 3': '0.47604397',
    'Enc. Variable 4': '-0.104925975',
    'Enc. Variable 5': '0.5235692',
    'Enc. Variable 6': '0.68818104',
    'Enc. Variable 7': '-0.19932081',
    'Enc. Variable 8': '0.14001754'
  },
  ...]

*/