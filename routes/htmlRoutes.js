const express = require('express');
const path = require('path');
const router = express.Router();

// HTML routes
router.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/notes', (_, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});


module.exports = router;

