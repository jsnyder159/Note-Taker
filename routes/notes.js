const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsutils');

router.get('/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))})

);

router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    
    if (title && text) {
        const newNotes = {
            title,
            text,
            note_id: uuidv4(),
        };

    readAndAppend(newNotes, './db/db.json');

    const response = {
        status: "success",
        body: newNotes,
    };

    res.json(response);
    } else {
        res.json('Error posting note');
    }
});

module.exports = router;