const router = require('express').Router();
const path = require('path');

// routes to index.html file if / is end point.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// routes to notes.html if /notes is end poitn
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;