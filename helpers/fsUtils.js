const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (location, content) => {
    fs.writeFile(location, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\n Data written to ${location}`)
    )};

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