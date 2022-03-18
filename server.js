const router = require("express").Router();
const fs = require('fs');
const path = require('path');
const api = require('./routes/notes.js');
const express = require('express');
const PORT = process.env.port || 3001;
const app = express();
const html = require('./routes/index.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/', html)
app.use('/api', api);

app.use(express.static('public'));

// Anything else sends to Homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App Listening at http://localhost:${PORT}`)
);