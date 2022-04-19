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
    // console.log(newRe);
    fs.writeFile("output.json", JSON.stringify(newRe), 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
      console.log("JSON file has been saved.");
    });
  })
