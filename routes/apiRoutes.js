const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Read the contents of the db.json file
const dbPath = path.join(__dirname, 'db.json');
let notes = [];
fs.readFile(dbPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading db.json:', err);
  } else {
    notes = JSON.parse(data);
  }
});

// GET route to retrieve all notes
router.get('/notes', (req, res) => {
  res.json(notes);
});

// POST route to save a new note
router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now().toString(); // Assign a unique ID to the new note
  notes.push(newNote);
  saveNotesToDB();
  res.json(newNote);
});

// DELETE route to delete a note by ID
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const index = notes.findIndex((note) => note.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
    saveNotesToDB();
    res.json({ message: 'Note deleted successfully' });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// Function to save the notes array to the db.json file
const saveNotesToDB = () => {
  fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
    if (err) {
      console.error('Error writing to db.json:', err);
    }
  });
};

module.exports = router;
