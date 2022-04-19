const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('united.csv')
  .pipe(csv({ separator: ','}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    let newRe = [];
    results.map((entire) => {
      let obj = {};
      for(let [key, value] of Object.entries(entire)){
        key = key.replaceAll('"', '')
        obj[key] = value;
      }
      newRe.push(obj);
    });
    console.log(newRe);
  })


