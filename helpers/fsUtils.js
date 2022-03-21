const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);


// Writes to file, if error writes error if not says it has written data to "location ./db/db.json"
const writeToFile = (location, content) => {
    fs.writeFile(location, JSON.stringify(content), (err) =>
        err ? console.error(err) : console.info(`\n Data written to ${location}`)
    )};

// function to read content + file location.  If its an error it writes the error if not,
// it will write to file location + parsedData
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err, data);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        };
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend };