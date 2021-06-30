const router = require('express').Router();
const fs = require('fs');
const path = require('path');
var notesData;

// ROUTING
fs.readFile("./db/db.json", 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return (res.status(404))
    }
    console.log(data);
    notesData = JSON.parse(data);
});

// API GET Requests
router.get('/notes', (req, res) => {
    if (res) {
        res.json(notesData);
    }
    else (err) => {
        console.error(err)
        return (res.status(500))
    }
});

// API POST Requests
router.post('/notes', (req, res) => {
    let note = req.body;
    const { title, text } = note;
    const newNote = { title, text, id: uuidv1() };
    console.log("Note Added!");
    return fs.writeFile("./db/db.json", newNote);
});

//GET note by ID
router.get("/api/notes/:id", (req, res) => {
    res.json(notes[req.params.id]);
});

//DELETE note by ID
router.get("/api/notes/:id", (req, res) => {
    notes.splice(req.params.id, 1);
    updateDB();
    console.log("Note Deleted!")
});

module.exports = router;