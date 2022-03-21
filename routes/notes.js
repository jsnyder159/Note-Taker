const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile, } = require('../helpers/fsUtils');


// Shows saved note
router.get('/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))})

);

// Adds new note to saved not section and adds an unique ID to them.
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    
    if (title && text) {
        const newNotes = {
            title,
            text,
            id: uuidv4(),
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

// Delete Function for the garbage can button.  Cycles through list of notes, adds all notes not matching the searched ID, 
//adds them to a new array, and then writes the new array in saved notes section.
router.delete('/notes/:id', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        var list = JSON.parse(data);
        var newArray = [];
        for (i=0; i<list.length; i++){
            if ( req.params.id !== list[i].id ){
                newArray.push(list[i])
            }; 
        };
        writeToFile('./db/db.json', newArray)
        res.json({message: 'Successfully Added'})
    });
});

module.exports = router;