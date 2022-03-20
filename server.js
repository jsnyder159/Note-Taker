const router = require("express").Router();
const fs = require('fs');
const path = require('path');
const api = require('./routes/notes.js');

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const html = require('./routes/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/', html);
app.use('/api', api);

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`App Listening at http://localhost:${PORT}`)
});